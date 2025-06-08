import mongoose from "mongoose";
import UserModel from "./user/user.schema";
import CategoryModel from "./category/category.schema";
import ProductModel from "./product/product.schema";
import OrderModel from "./order/order.schema";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/ecom_app";

export async function connectMongoose() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  }
}

export async function ensureMongoCollections() {
  // Insert and delete a dummy doc for each collection to force creation
  await Promise.all([
    UserModel.create({ name: "_init_", email: "_init_" }).then((doc: any) =>
      UserModel.findByIdAndDelete(doc._id)
    ),
    CategoryModel.create({ name: "_init_" }).then((doc: any) =>
      CategoryModel.findByIdAndDelete(doc._id)
    ),
    ProductModel.create({
      name: "_init_",
      price: 0,
      categoryId: new CategoryModel()._id,
    }).then((doc: any) => ProductModel.findByIdAndDelete(doc._id)),
    OrderModel.create({
      userId: new UserModel()._id,
      productIds: [],
      createdAt: new Date(),
    }).then((doc: any) => OrderModel.findByIdAndDelete(doc._id)),
  ]);
}

export default mongoose;
