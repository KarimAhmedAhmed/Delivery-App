import { offerStatus } from "../../../domain/types/offerStatus";

export interface Offer extends Document {
  orderId: string;
  driverId: string[];
  raisedPrice: number;
  status: offerStatus;
}
