import { offerStatus } from "../../app/infrastructure/data-access/dtos/OfferDTO";
import { Offer } from "../entities/Offer";
import { Order } from "../entities/Order";
import { User } from "../entities/User";

export abstract class OfferRepository {
  abstract createOffer(
    order: Order,
    driver: User,
    raisedPrice: number,
    status: offerStatus
  ): Promise<void>;
  abstract updateOffer(offerId: string, obj: object): Promise<boolean>;
  abstract setDriver(drivers: Partial<User[]>, order: Order): Promise<Object>;
  abstract customerAcceptedDriverOffer(offerId: string): Promise<Offer>;
  abstract customerDeclinedDriverOffer(offerId: string): Promise<boolean>;
  // abstract driverAcceptedAnOrder(driver: User, order: Order): Promise<boolean>;
  //   abstract raisePriceByDriver(
  //     driver: User,
  //     order: Order,
  //     price: BigInteger
  //   ): Promise<object | null>;
}
