import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document{
    _id: string;
    customerId: string;
    items: { productId: string; quantity: number }[];
    price: BigInteger;
    pickupPoint: string;
    deliveryLocation: string;
    status: 'Pending' | 'Delivered' | 'Cancelled';
}

const OrderSchema = new Schema<IOrder>({
    _id: String,
    customerId: String,
    items: [String],
    price: Number,
    pickupPoint: String,
    deliveryLocation: String,
    status: String
});

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;