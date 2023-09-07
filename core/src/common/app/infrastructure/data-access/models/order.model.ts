import mongoose, { Schema, Document } from "mongoose";
import { orderStatus } from "../dtos/OrderDTO";
import { location } from "../../../utils/Middlewares";
import { Order } from "../../../../domain/entities/Order";

export interface IOrder extends Document {
  customerId: string;
  items: string[];
  price: number;
  pickupPoint: location;
  deliveryLocation: location;
  status: orderStatus;
}

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
});

const OrderModel = mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;
