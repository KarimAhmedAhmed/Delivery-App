import { location } from "../../../domain/types/location";
import { orderStatus } from "../../../domain/types/orderStatus";
import { Offer } from "../../../domain/entities/Offer";

export interface Order {
  customerId: string;
  items: string[];
  price: number;
  pickupPoint: location;
  deliveryLocation: location;
  status: orderStatus;
  offer?: Offer;
}
