import mongoose, { Schema, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IAddress {
  _id?: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  email: string;
  password?: string;
  role: 'customer' | 'admin';
  name?: string;
  phone?: string;
  addresses?: IAddress[];
  reset_token?: string;
  reset_expires_at?: Date;
}

const AddressSchema = new Schema<IAddress>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  name: { type: String },
  phone: { type: String },
  addresses: [AddressSchema],
  reset_token: { type: String },
  reset_expires_at: { type: Date }
}, { timestamps: true });

UserSchema.plugin(paginate);

export const User = mongoose.model<IUser, PaginateModel<IUser>>('User', UserSchema);
