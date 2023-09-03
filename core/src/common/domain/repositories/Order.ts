import { Driver } from "../entities/Driver";
import { Order } from "../entities/Order";

export abstract class OrderRepository{
    abstract createOrder(items: string[], price:BigInteger, pickUpPoint: string, dropDownPoint: string): Promise<Order | null>;
    abstract updateOrder()
    abstract setDriver(driver: Driver, order: Order): Promise<boolean>;
    abstract declineDriver(driver: Driver, order: Order): Promise<boolean>;
    abstract driverAccepted(driver: Driver, order:Order): Promise<boolean>;
    abstract raisePriceByDriver(driver:Driver,order:Order): Promise<object | null>;


}