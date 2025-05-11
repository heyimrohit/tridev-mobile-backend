import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  image: string;
  price: number;
  offerPrice?: number;
  actualPrice?: number;
  discount?: number;
  rating?: number;
}

const ProductSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: Number,
    discount: Number,
    rating: { type: Number, default: 0, min: 0, max: 5 },
  },
  { timestamps: true }
);

ProductSchema.pre<IProduct>('save', function (next) {
  if (this.offerPrice && this.price && this.price > 0) {
    this.discount = Math.round(((this.price - this.offerPrice) / this.price) * 100);
  }
  next();
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;