
interface Order {
    _id: string;
    customerId: string;
    items: { productId: string; quantity: number }[];
    price: BigInteger;
    pickupPoint: string;
    deliveryLocation: string;
    status: 'Pending' | 'Delivered' | 'Cancelled';
}

