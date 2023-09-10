import { ObjectId } from "mongoose";
import { offerStatus } from "../types/offerStatus";
import { Order } from "./Order";
import { User } from "./User";

export class Offer {
  constructor(
    readonly order: Order,
    readonly driver: User,
    readonly raisedPrice: number,
    // readonly distance: number,
    readonly status: offerStatus,
    readonly _id?: ObjectId
  ) {}
}
