import { OrderRepository } from "../../domain/repositories/Order";
import OfferModel from "../data-access/models/offer.model";
import OrderModel from "../data-access/models/order.model";
import { OfferRepositoryMongo } from "./OfferRepository";
import { location } from "../../domain/types/location";
import { Order } from "../../domain/entities/Order";
import { Offer } from "../../domain/entities/Offer";

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
    return newOrder;
  }

  async updateOrder(orderId: string, obj: object) {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(orderId, obj, {
      new: true,
    });
    return true;
  }

  async getOrderById(orderId: string) {
    const order = await this.orderModel.findById(orderId).exec();
    return order as Order;
  }

  async customerAcceptedDriver(offer: Offer) {
    const filterOffer = await this.offerModel.findOne(offer).select("driver");

    const order = await this.orderModel.findOneAndUpdate(offer.order, {
      status: "On-The-Way",
      offer: filterOffer,
    });
  }
}
