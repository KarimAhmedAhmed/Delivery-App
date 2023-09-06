interface Order {
  _id: string;
  customerId: string;
  items: { productId: string; quantity: number }[];
  price: BigInteger;
  pickupPoint: string;
  deliveryLocation: string;
  status: orderStatus;
}

export type orderStatus = "Pending" | "Delivered" | "Cancelled" | "On-The-Way";
