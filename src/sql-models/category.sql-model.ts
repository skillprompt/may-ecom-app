import pool from "./mysql-client";

export const SqlCategoryModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
  },
  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [
      id,
    ]);
    return Array.isArray(rows) && rows.length ? rows[0] : undefined;
  },
  async create(category: { name: string }) {
    const [result]: any = await pool.query(
      "INSERT INTO categories (name) VALUES (?)",
      [category.name]
    );
    return { id: result.insertId, ...category };
  },
  async update(id: number, category: Partial<{ name: string }>) {
    if (category.name === undefined) return undefined;
    await pool.query("UPDATE categories SET name = ? WHERE id = ?", [
      category.name,
      id,
    ]);
    return this.getById(id);
  },
  async delete(id: number) {
    const [result]: any = await pool.query(
      "DELETE FROM categories WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};
