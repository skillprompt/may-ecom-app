import pool from "./mysql-client";

export const SqlUserModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },
  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return Array.isArray(rows) && rows.length ? rows[0] : undefined;
  },
  async create(user: { name: string; email: string }) {
    const [result]: any = await pool.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [user.name, user.email]
    );
    return { id: result.insertId, ...user };
  },
  async update(id: number, user: Partial<{ name: string; email: string }>) {
    const fields = [];
    const values = [];
    if (user.name !== undefined) {
      fields.push("name = ?");
      values.push(user.name);
    }
    if (user.email !== undefined) {
      fields.push("email = ?");
      values.push(user.email);
    }
    if (!fields.length) return undefined;
    await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, [
      ...values,
      id,
    ]);
    return this.getById(id);
  },
  async delete(id: number) {
    const [result]: any = await pool.query("DELETE FROM users WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};
