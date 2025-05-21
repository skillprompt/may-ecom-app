// Category type definition
export interface Category {
  id: number;
  name: string;
}

let categories: Category[] = [];
let nextId = 1;

export const CategoryModel = {
  getAll(): Category[] {
    return categories;
  },
  getById(id: number): Category | undefined {
    return categories.find((c) => c.id === id);
  },
  create(category: Omit<Category, "id">): Category {
    const newCategory = { ...category, id: nextId++ };
    categories.push(newCategory);
    return newCategory;
  },
  update(
    id: number,
    category: Partial<Omit<Category, "id">>
  ): Category | undefined {
    const idx = categories.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    categories[idx] = { ...categories[idx], ...category };
    return categories[idx];
  },
  delete(id: number): boolean {
    const idx = categories.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    categories.splice(idx, 1);
    return true;
  },
};
