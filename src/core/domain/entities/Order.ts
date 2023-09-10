import { orderStatus } from "../../app/infrastructure/data-access/dtos/OrderDTO";
import { location } from "../../../../../src/app/utils/Middlewares";
import { Offer } from "./Offer";
import { User } from "./User";

export class Order {
  constructor(
    readonly customerId: string,
    readonly items: string[],
    readonly price: number,
    readonly pickUpPoint: location,
    readonly deliveryLocation: location,
    readonly status: orderStatus
  ) {}
}
