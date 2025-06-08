import UserModel, { IUser } from "./user.schema";

export const MongoUserService = {
  async getAll() {
    return UserModel.find();
  },
  async getById(id: string) {
    return UserModel.findById(id);
  },
  async create(user: Omit<IUser, "_id">) {
    return UserModel.create(user);
  },
  async update(id: string, user: Partial<IUser>) {
    return UserModel.findByIdAndUpdate(id, user, { new: true });
  },
  async delete(id: string) {
    const res = await UserModel.findByIdAndDelete(id);
    return !!res;
  },
};
