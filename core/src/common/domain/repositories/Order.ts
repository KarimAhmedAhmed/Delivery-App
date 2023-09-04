import { Customer } from "../entities/Customer";
import { Driver } from "../entities/Driver";
import { Order } from "../entities/Order";

export abstract class OrderRepository{
    abstract createOrder(items: string[], price:BigInteger, pickUpPoint: string, dropDownPoint: string, customer: Customer): Promise<Order | null>;
    abstract updateOrder(order: Order, obj: object): Promise<boolean>;
    abstract setDriver(driver: Driver[], order: Order): Promise<boolean>;
    abstract declineDriver(driver: Driver, order: Order): Promise<boolean>;
    abstract driverAccepted(driver: Driver, order:Order): Promise<boolean>;
    abstract customerAccepted(driver: Driver, order:Order): Promise<boolean>;
    abstract raisePriceByDriver(driver:Driver,order:Order, price:BigInteger): Promise<object | null>;
    abstract startTrip(): Promise<object| null>;
    abstract notifyTheCustomer(order: Order, driver:Driver): Promise<boolean>;


}