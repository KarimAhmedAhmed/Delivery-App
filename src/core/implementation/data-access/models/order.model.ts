import mongoose, { Schema } from "mongoose";
import { Order } from "../../../domain/entities/Order";

const OrderSchema = new Schema<Order>({
  customerId: String,
  items: [String],
  price: Number,
  pickUpPoint: {
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
  offer: { type: Object, required: false },
});

const OrderModel = mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;
