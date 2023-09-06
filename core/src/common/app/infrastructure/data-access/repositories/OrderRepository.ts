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

  async setDriver(driver: User[], order: Order) {}
  // async getOrderById(orderId: string): Promise<Order | null> {
  //   return await this.orderModel.findById(orderId).exec();
  // }
}
