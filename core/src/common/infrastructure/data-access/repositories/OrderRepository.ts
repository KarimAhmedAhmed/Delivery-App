import { Collection } from 'mongodb';
import { client } from '../../config/database.config';

class OrderRepository {
    private collection: Collection<Order>;

    constructor() {
        this.collection = client.db('delivery-db').collection('orders');
    }

    async createOrder(order: Order): Promise<void> {
        await this.collection.insertOne(order);
    }

    async getOrderById(orderId: string): Promise<Order | null> {
        return await this.collection.findOne({ _id: orderId });
    }

    // Add more CRUD methods as needed
}

export default OrderRepository;
