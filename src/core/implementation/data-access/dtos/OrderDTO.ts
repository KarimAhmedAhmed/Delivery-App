import { location } from "../../../../../../../src/app/utils/Middlewares";

export interface Order {
  customerId: string;
  items: string[];
  price: number;
  pickupPoint: location;
  deliveryLocation: location;
  status: orderStatus;
}

export type orderStatus = "Pending" | "Delivered" | "Cancelled" | "On-The-Way";
