import { location } from "../../../utils/Middlewares";

export interface Order {
  customerId: string;
  items: { productId: string; quantity: number }[];
  price: number;
  pickupPoint: location;
  deliveryLocation: location;
  status: orderStatus;
}

export type orderStatus = "Pending" | "Delivered" | "Cancelled" | "On-The-Way";
