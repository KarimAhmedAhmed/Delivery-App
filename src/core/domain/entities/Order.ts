import { ObjectId } from "mongoose";
import { location } from "../types/location";
import { orderStatus } from "../types/orderStatus";
import { Offer } from "./Offer";

export class Order {
  constructor(
    readonly customerId: string,
    readonly items: string[],
    readonly price: number,
    readonly pickUpPoint: location,
    readonly deliveryLocation: location,
    readonly status: orderStatus,
    readonly offer?: Offer
  ) {}
}
