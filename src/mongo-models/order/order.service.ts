import OrderModel, { IOrder } from "./order.schema";

export const MongoOrderService = {
  async getAll() {
    return OrderModel.find();
  },
  async getById(id: string) {
    return OrderModel.findById(id);
  },
  async create(order: Omit<IOrder, "_id" | "createdAt">) {
    return OrderModel.create(order);
  },
  async update(id: string, order: Partial<IOrder>) {
    return OrderModel.findByIdAndUpdate(id, order, { new: true });
  },
  async delete(id: string) {
    const res = await OrderModel.findByIdAndDelete(id);
    return !!res;
  },
};
