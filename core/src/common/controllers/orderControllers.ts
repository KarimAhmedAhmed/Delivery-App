// controllers/orderController.ts
import { Request, Response } from 'express';
import Orders from '../domain/useCases/Orders';

export class OrderController {
    constructor(
        readonly orders: Orders
    ){}

     async createOrder(req: Request, res: Response) {
        try {
            const { customer, items, price, pickUpPoint, dropDownPoint } = req.body;
            const order = await this.orders.makeAnOrder(items, price, pickUpPoint, dropDownPoint, customer );
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async sendOrderToDrivers(req: Request, res: Response) {
        try {
            const { order } = req.body;
            const sendOrderToDrivers = await this.orders.sendOrderToDrivers(order);
            res.status(201).json(sendOrderToDrivers);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async orderPending(req: Request, res: Response) {
        try {
            const { order, driver, price } = req.body;
            const orderPending = await this.orders.orderPending(order, driver, price);
            res.status(201).json(orderPending);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async orderJourney(req: Request, res: Response) {
        try {
            const { order, driver } = req.body;
            const orderAccepted = await this.orders.orderAccepted(order, driver);
           //TODO
           //Track the order
           //Send the order's status to the customer seq. 
            
           
           
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}


