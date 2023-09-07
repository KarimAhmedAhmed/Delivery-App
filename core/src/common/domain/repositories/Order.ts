import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { location } from "../../app/utils/Middlewares";
import { Offer } from "../entities/Offer";

export abstract class OrderRepository {
  abstract createOrder(
    customer: string,
    items: string[],
    price: number,
    pickUpPoint: location,
    dropDownPoint: location,
    token: string
  ): Promise<void>;
  abstract updateOrder(
    orderId: string,
    obj: object,
    token: string
  ): Promise<boolean>;
  abstract customerAcceptedDriver(offer: Offer, token: string): Promise<void>;
  abstract getOrderById(orderId: string, token: string): Promise<Order>;
  // abstract driverAcceptedAnOrder(driver: User, order: Order): Promise<boolean>;
  //   abstract raisePriceByDriver(
  //     driver: User,
  //     order: Order,
  //     price: BigInteger
  //   ): Promise<object | null>;

  //   abstract startTrip(driver: User, order: Order): Promise<object | null>;
  //   abstract notifyTheCustomer(driver: User, order: Order): Promise<boolean>;
}
