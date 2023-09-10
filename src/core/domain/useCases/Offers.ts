import { Order } from "../entities/Order";
import { User } from "../entities/User";
import { OfferRepository } from "../repositories/Offer";
import { Offer } from "../entities/Offer";

export class Offers {
  constructor(private readonly offerRepository: OfferRepository) {}

  async createOffer(order: Order, driver: User, raisedPrice: number) {
    const newoffer = new Offer(order, driver, raisedPrice, "Pending");
    const offerCreated = await this.offerRepository.createOffer(
      order,
      driver,
      raisedPrice,
      "Pending"
    );

    return offerCreated;
  }

  async updateOffer(offerId: string, obj: object) {
    const updateOffer = await this.offerRepository.updateOffer(offerId, obj);
    return updateOffer;
  }

  async customerAcceptedDriverOffer(offerId: string) {
    const offerAccepted =
      await this.offerRepository.customerAcceptedDriverOffer(offerId);
    return offerAccepted;
  }

  async customerDeclinedDriverOffer(offerId: string) {
    await this.offerRepository.customerDeclinedDriverOffer(offerId);
  }
}
