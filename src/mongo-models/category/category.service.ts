import CategoryModel, { ICategory } from "./category.schema";

export const MongoCategoryService = {
  async getAll() {
    return CategoryModel.find();
  },
  async getById(id: string) {
    return CategoryModel.findById(id);
  },
  async create(category: Omit<ICategory, "_id">) {
    return CategoryModel.create(category);
  },
  async update(id: string, category: Partial<ICategory>) {
    return CategoryModel.findByIdAndUpdate(id, category, { new: true });
  },
  async delete(id: string) {
    const res = await CategoryModel.findByIdAndDelete(id);
    return !!res;
  },
};
