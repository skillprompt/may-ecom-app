import pool from "./mysql-client";

type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
};

export const SqlProductModel = {
  async getAll(): Promise<Product[]> {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows as Product[];
  },
  async getById(id: number): Promise<Product | undefined> {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return Array.isArray(rows) && rows.length
      ? (rows[0] as Product)
      : undefined;
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
    const fields = []; // ['name = ?', 'price = ?', 'categoryId = ?']
    // name = ?, price = ?, categoryId = ?
    const values = []; // ['ram',99, 1]
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

    // UPDATE products SET name = ?, price = ?, categoryId= ? where id= 5
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
