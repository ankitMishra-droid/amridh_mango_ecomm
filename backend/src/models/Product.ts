import mongoose, { Schema, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  image_url: string;
  images: string[];
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  sku: { type: String, unique: true, required: true },
  image_url: { type: String },
  images: [{ type: String }]
}, { timestamps: true });

ProductSchema.plugin(paginate);

export const Product = mongoose.model<IProduct, PaginateModel<IProduct>>('Product', ProductSchema);
