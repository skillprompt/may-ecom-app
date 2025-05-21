import pool from "./mysql-client";

export const SqlProductModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },
  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return Array.isArray(rows) && rows.length ? rows[0] : undefined;
  },
  async create(product: { name: string; price: number; categoryId: number }) {
    const [result]: any = await pool.query(
      "INSERT INTO products (name, price, categoryId) VALUES (?, ?, ?)",
      [product.name, product.price, product.categoryId]
    );
    return { id: result.insertId, ...product };
  },
  async update(
    id: number,
    product: Partial<{ name: string; price: number; categoryId: number }>
  ) {
    const fields = [];
    const values = [];
    if (product.name !== undefined) {
      fields.push("name = ?");
      values.push(product.name);
    }
    if (product.price !== undefined) {
      fields.push("price = ?");
      values.push(product.price);
    }
    if (product.categoryId !== undefined) {
      fields.push("categoryId = ?");
      values.push(product.categoryId);
    }
    if (!fields.length) return undefined;
    await pool.query(`UPDATE products SET ${fields.join(", ")} WHERE id = ?`, [
      ...values,
      id,
    ]);
    return this.getById(id);
  },
  async delete(id: number) {
    const [result]: any = await pool.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};
