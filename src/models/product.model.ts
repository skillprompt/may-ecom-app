// Product type definition
export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

// In-memory product store
let products: Product[] = [];
let nextId = 1;

export const ProductModel = {
  getAll(): Product[] {
    return products;
  },
  getById(id: number): Product | undefined {
    return products.find((p) => p.id === id);
  },
  create(product: Omit<Product, "id">): Product {
    const newProduct = { ...product, id: nextId++ };
    products.push(newProduct);
    return newProduct;
  },
  update(
    id: number,
    product: Partial<Omit<Product, "id">>
  ): Product | undefined {
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    products[idx] = { ...products[idx], ...product };
    return products[idx];
  },
  delete(id: number): boolean {
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    products.splice(idx, 1);
    return true;
  },
};
