import { location } from "../../../domain/types/location";
import { orderStatus } from "../../../domain/types/orderStatus";

export interface Order {
  customerId: string;
  items: string[];
  price: number;
  pickupPoint: location;
  deliveryLocation: location;
  status: orderStatus;
}
