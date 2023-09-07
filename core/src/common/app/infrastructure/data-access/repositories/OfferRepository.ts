import OfferModel from "../models/offer.model";
import { Offer } from "../../../../domain/entities/Offer";
import { offerStatus } from "../dtos/OfferDTO";
import { OfferRepository } from "../../../../domain/repositories/Offer";
import { Order } from "../../../../domain/entities/Order";
import { User } from "../../../../domain/entities/User";
import { updateOrder } from "../../../controllers/orderControllers";
import { OrderRepositoryMongo } from "./OrderRepository";

let orderRepository = new OrderRepositoryMongo();
export class OfferRepositoryMongo extends OfferRepository {
  private readonly offerModel = OfferModel;

  async createOffer(
    order: Order,
    driver: User,
    raisedPrice: number,
    status: offerStatus
  ) {
    const offer = new Offer(order, driver, raisedPrice, status);
    const newOrder = new this.offerModel(offer);
    await newOrder.save();
  }

  async updateOffer(offerId: string, obj: object) {
    const updatedOffer = await this.offerModel.findByIdAndUpdate(offerId, obj, {
      new: true,
    });
    console.log(updatedOffer);
    return true;
  }

  async setDriver(drivers: User[], order: Order) {
    let offer;
    for (let driver in drivers) {
      offer = new Offer(order, drivers[driver], 0, "Pending");
      await this.createOffer(order, drivers[driver], 0, "Pending");
    }
    return drivers;
  }

  async customerAcceptedDriverOffer(offerId: string) {
    const acceptedOffer = await this.offerModel.findByIdAndUpdate(
      offerId,
      { status: "Accepted" },
      {
        new: true,
      }
    );

    return acceptedOffer as Offer;
  }

  async customerDeclinedDriverOffer(offerId: string) {
    const declinedOffer = await this.offerModel.findByIdAndUpdate(
      offerId,
      { status: "Declined" },
      {
        new: true,
      }
    );
    console.log(declinedOffer);
    return true;
  }
}
