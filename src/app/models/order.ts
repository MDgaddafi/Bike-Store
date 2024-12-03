import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  email: string;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

const orderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);
