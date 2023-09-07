import { Model } from "mongoose";
import OrderModel from "../models/order.model";
import { OrderRepository } from "../../../../domain/repositories/Order";
import { User } from "../../../../domain/entities/User";
import { Order } from "../../../../domain/entities/Order";
import UserRepository from "./UserRepository";
import { location } from "../../../utils/Middlewares";
import OfferModel from "../models/offer.model";
import { OfferRepositoryMongo } from "./OfferRepository";
import { Offer } from "../../../../domain/entities/Offer";
export class OrderRepositoryMongo extends OrderRepository {
  private readonly orderModel = OrderModel;
  private readonly offerModel = OfferModel;
  private readonly offerRepository = OfferRepositoryMongo;

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

  async updateOrder(orderId: string, obj: object) {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(orderId, obj, {
      new: true,
    });
    console.log(updatedOrder);
    return true;
  }

  async getOrderById(orderId: string) {
    const order = await this.orderModel.findById(orderId).exec();
    return order as Order;
  }

  async customerAcceptedDriver(offer: Offer) {
    const order = await this.orderModel.findOneAndUpdate(offer.order, {
      status: "On-The-Way",
    });
    console.log(order);
  }
}
