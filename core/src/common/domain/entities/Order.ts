import { orderStatus } from "../../app/infrastructure/data-access/dtos/OrderDTO";
import { location } from "../../app/utils/Middlewares";
import { User } from "./User";

export class Order {
  constructor(
    readonly customer: string,
    readonly items: string[],
    readonly price: number,
    readonly pickUpPoint: location,
    readonly dropDownPoint: location,
    readonly status: orderStatus
  ) {}
}
