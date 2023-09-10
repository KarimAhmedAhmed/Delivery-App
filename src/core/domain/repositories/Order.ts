import { Order } from "../entities/Order";
import { location } from "../types/location";
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
  abstract updateOrder(orderId: string, obj: object): Promise<boolean>;
  abstract customerAcceptedDriver(offer: Offer): Promise<void>;
  abstract getOrderById(orderId: string): Promise<Order>;
  // abstract driverAcceptedAnOrder(driver: User, order: Order): Promise<boolean>;
  //   abstract raisePriceByDriver(
  //     driver: User,
  //     order: Order,
  //     price: BigInteger
  //   ): Promise<object | null>;

  //   abstract startTrip(driver: User, order: Order): Promise<object | null>;
  //   abstract notifyTheCustomer(driver: User, order: Order): Promise<boolean>;
}
