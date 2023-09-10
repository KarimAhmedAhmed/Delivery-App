export interface Offer extends Document {
  orderId: string;
  driverId: string[];
  raisedPrice: number;
  status: offerStatus;
}

export type offerStatus = "Pending" | "Accepted" | "Declined";
