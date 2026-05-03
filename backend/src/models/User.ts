import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  role: 'customer' | 'admin';
  name?: string;
  phone?: string;
  reset_token?: string;
  reset_expires_at?: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  name: { type: String },
  phone: { type: String },
  reset_token: { type: String },
  reset_expires_at: { type: Date }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);
