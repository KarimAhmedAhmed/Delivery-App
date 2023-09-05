// controllers/orderController.ts
import { Request, Response } from 'express';
import {Orders} from '../../domain/useCases/Orders';


let orders:Orders;
        
export const createOrder = async (req: Request, res: Response) => {
try {

    const { customer, items, price, pickUpPoint, dropDownPoint } = req.body;
    const order = await orders.makeAnOrder(items, price, pickUpPoint, dropDownPoint, customer );
    res.status(201).json(order);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
}

export const sendOrderToDrivers= async (req: Request, res: Response) => {

try {
    const { order } = req.body;
    const sendOrderToDrivers = await orders.sendOrderToDrivers(order);
    res.status(201).json(sendOrderToDrivers);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
}

export const orderPending= async (req: Request, res: Response) => {

try {
    const { order, driver, price } = req.body;
    const orderPending = await orders.orderPending(order, driver, price);
    res.status(201).json(orderPending);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
}
export const orderJourney= async (req: Request, res: Response) => {

try {
    const { order, driver } = req.body;
    const orderAccepted = await orders.orderAccepted(order, driver);
    //TODO
    //Track the order
    //Send the order's status to the customer seq. 
    
    
    
    res.status(201).json(order);
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}

}

     


