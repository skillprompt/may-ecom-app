import ProductModel, { IProduct } from "./product.schema";

export const MongoProductService = {
  async getAll() {
    return ProductModel.find();
  },
  async getById(id: string) {
    return ProductModel.findById(id);
  },
  async create(product: Omit<IProduct, "_id">) {
    return ProductModel.create(product);
  },
  async update(id: string, product: Partial<IProduct>) {
    return ProductModel.findByIdAndUpdate(id, product, { new: true });
  },
  async delete(id: string) {
    const res = await ProductModel.findByIdAndDelete(id);
    return !!res;
  },
};
