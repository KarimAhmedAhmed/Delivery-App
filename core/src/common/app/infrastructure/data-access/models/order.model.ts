import mongoose, { Schema, Document } from "mongoose";
import { orderStatus } from "../dtos/OrderDTO";
import { location } from "../../../utils/Middlewares";

interface IOrder extends Document {
  customerId: string;
  items: { productId: string; quantity: number }[];
  price: number;
  pickupPoint: location;
  deliveryLocation: location;
  status: orderStatus;
}

const OrderSchema = new Schema<IOrder>({
  customerId: String,
  items: [String],
  price: Number,
  pickupPoint: {
    name: String,
    coordinates: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number], // [longitude, latitude]
    },
  },
  deliveryLocation: {
    name: String,
    coordinates: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number], // [longitude, latitude]
    },
  },
  status: { type: String, required: true },
});

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
