import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  user_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  quantity: number;
}

const CartSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });

CartSchema.index({ user_id: 1, product_id: 1 }, { unique: true });

export const Cart = mongoose.model<ICart>('Cart', CartSchema);
