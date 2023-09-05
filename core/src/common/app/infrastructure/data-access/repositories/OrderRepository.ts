import { Model } from 'mongoose';

class OrderRepository {

    constructor(private readonly orderModel: Model<Order> ) {}

    async createOrder(order: Order): Promise<Order> {
        const newOrder = new this.orderModel(order);
        return await newOrder.save();
    }

    async getOrderById(orderId: string): Promise<Order | null> {
        return await this.orderModel.findById(orderId).exec();
    }

}

export default OrderRepository;

