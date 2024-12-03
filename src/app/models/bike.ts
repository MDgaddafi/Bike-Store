import mongoose, { Schema, Document } from 'mongoose';

interface IBike extends Document {
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
}

const bikeSchema = new Schema<IBike>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBike>('Bike', bikeSchema);
