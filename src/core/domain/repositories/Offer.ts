import { ObjectId } from "mongoose";
import { Offer } from "../entities/Offer";
import { Order } from "../entities/Order";
import { User } from "../entities/User";
import { offerStatus } from "../types/offerStatus";

export abstract class OfferRepository {
  abstract createOffer(
    order: Order,
    driver: User,
    raisedPrice: number,
    status: offerStatus
  ): Promise<Offer>;
  abstract updateOffer(offerId: string, obj: object): Promise<boolean>;
  abstract setDriver(drivers: Partial<User[]>, order: Order): Promise<Object>;
  abstract customerAcceptedDriverOffer(offerId: string): Promise<Offer | null>;
  abstract customerDeclinedDriverOffer(offerId: string): Promise<boolean>;
  // abstract driverAcceptedAnOrder(driver: User, order: Order): Promise<boolean>;
  //   abstract raisePriceByDriver(
  //     driver: User,
  //     order: Order,
  //     price: BigInteger
  //   ): Promise<object | null>;
}
