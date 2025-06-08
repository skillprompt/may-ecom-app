import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
});

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
