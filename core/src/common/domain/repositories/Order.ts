import { User } from "../entities/User";
import { Order } from "../entities/Order";

export abstract class OrderRepository {
  abstract createOrder(
    items: string[],
    price: BigInteger,
    pickUpPoint: string,
    dropDownPoint: string,
    customer: User
  ): Promise<Order | null>;
  abstract updateOrder(order: Order, obj: object): Promise<boolean>;
  abstract setDriver(driver: User[], order: Order): Promise<boolean>;
  abstract declineDriver(driver: User, order: Order): Promise<boolean>;
  abstract driverAccepted(driver: User, order: Order): Promise<boolean>;
  abstract customerAccepted(driver: User, order: Order): Promise<boolean>;
  abstract raisePriceByDriver(
    driver: User,
    order: Order,
    price: BigInteger
  ): Promise<object | null>;
  abstract startTrip(driver: User, order: Order): Promise<object | null>;
  abstract notifyTheCustomer(driver: User, order: Order): Promise<boolean>;
}
