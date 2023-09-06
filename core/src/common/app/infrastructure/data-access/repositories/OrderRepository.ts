import { Model } from "mongoose";
import OrderModel from "../models/order.model";
import { OrderRepository } from "../../../../domain/repositories/Order";
import { User } from "../../../../domain/entities/User";
import { Order } from "../../../../domain/entities/Order";
import UserRepository from "./UserRepository";
import { location } from "../../../utils/Middlewares";
export class OrderRepositoryMongo extends OrderRepository {
  private readonly orderModel = OrderModel;

  async createOrder(
    customer: string,
    items: string[],
    price: number,
    pickUpPoint: location,
    dropDownPoint: location
  ) {
    const order = new Order(
      customer,
      items,
      price,
      pickUpPoint,
      dropDownPoint,
      "Pending"
    );
    const newOrder = new this.orderModel(order);
    await newOrder.save();
  }

  async updateOrder(order: Order, obj: object) {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(order, obj);
    console.log(updatedOrder);
  }

  // async getOrderById(orderId: string): Promise<Order | null> {
  //   return await this.orderModel.findById(orderId).exec();
  // }

  async setDriver(driver: Partial<User[]>, order: Order): Promise<Object> {
    return { driver, order };
  }
}
