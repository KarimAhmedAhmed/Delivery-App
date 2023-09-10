import { offerStatus } from "../../implementation/data-access/dtos/OfferDTO";
import { Order } from "./Order";
import { User } from "./User";

export class Offer {
  constructor(
    readonly order: Order,
    readonly driver: User,
    readonly raisedPrice: number,
    // readonly distance: number,
    readonly status: offerStatus
  ) {}
}
