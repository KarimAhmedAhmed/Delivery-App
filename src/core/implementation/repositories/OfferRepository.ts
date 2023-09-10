import { Offer } from "../../domain/entities/Offer";
import { Order } from "../../domain/entities/Order";
import { User } from "../../domain/entities/User";
import { OfferRepository } from "../../domain/repositories/Offer";
import { offerStatus } from "../../domain/types/offerStatus";
import OfferModel from "../data-access/models/offer.model";

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
    return offer;
  }

  async updateOffer(offerId: string, obj: object) {
    const updatedOffer = await this.offerModel.findByIdAndUpdate(offerId, obj, {
      new: true,
    });
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
    return acceptedOffer;
  }

  async customerDeclinedDriverOffer(offerId: string) {
    const declinedOffer = await this.offerModel.findByIdAndUpdate(
      offerId,
      { status: "Declined" },
      {
        new: true,
      }
    );
    return true;
  }
}
