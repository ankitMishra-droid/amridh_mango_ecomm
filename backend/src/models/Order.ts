import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user_id: mongoose.Types.ObjectId;
  total: number;
  status: string;
  items: any[];
  user_name?: string;
}

const OrderSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'Placed' },
  items: [{ type: Schema.Types.Mixed }], // Storing array of items directly
  user_name: { type: String },
  shippingData: { type: Schema.Types.Mixed },
  paymentMethod: { type: String }
}, { timestamps: true });

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
