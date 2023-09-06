import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { location } from "../../app/utils/Middlewares";

export abstract class OrderRepository {
  abstract createOrder(
    customer: string,
    items: string[],
    price: number,
    pickUpPoint: location,
    dropDownPoint: location
  ): Promise<void>;
  abstract updateOrder(order: Order, obj: object): Promise<void>;
  abstract setDriver(driver: User[], order: Order): Promise<object>;
  //   abstract declineDriver(driver: User, order: Order): Promise<boolean>;
  //   abstract driverAccepted(driver: User, order: Order): Promise<boolean>;
  //   abstract customerAccepted(driver: User, order: Order): Promise<boolean>;
  //   abstract raisePriceByDriver(
  //     driver: User,
  //     order: Order,
  //     price: BigInteger
  //   ): Promise<object | null>;
  //   abstract startTrip(driver: User, order: Order): Promise<object | null>;
  //   abstract notifyTheCustomer(driver: User, order: Order): Promise<boolean>;
}
