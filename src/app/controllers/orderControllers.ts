import { Request, Response } from "express";
import { wrapper } from "../utils/Wrapper";
import { OrderRepositoryMongo } from "../../core/implementation/repositories/OrderRepository";
import { UserRepositoryMongo } from "../../core/implementation/repositories/UserRepository";
import { OfferRepositoryMongo } from "../../core/implementation/repositories/OfferRepository";
import { Orders } from "../../core/domain/useCases/Orders";

let orderRepository = new OrderRepositoryMongo();
let userRepository = new UserRepositoryMongo();
let offerRepository = new OfferRepositoryMongo();

let orders = new Orders(userRepository, orderRepository, offerRepository);

export const createOrder = wrapper(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");

  const { customer, items, price, pickUpPoint, dropDownPoint } = req.body;
  const order = await orders.createOrder(
    customer,
    items,
    price,
    pickUpPoint,
    dropDownPoint,
    token
  );
  res.status(201).json(order);
});

export const updateOrder = wrapper(async (req: Request, res: Response) => {
  const { orderId, obj } = req.body;
  const updatedOrder = await orders.updateOrder(orderId, obj);
  res.status(201).json(updatedOrder);
});

export const getOrderById = wrapper(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await orders.getOrderById(orderId);
  res.status(201).json(order);
});

// export const sendOrderToDrivers = async (req: Request, res: Response) => {
//   try {
//     const { order } = req.body;
//     const sendOrderToDrivers = await orders.sendOrderToDrivers(order);
//     res.status(201).json(sendOrderToDrivers);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const orderPending = async (req: Request, res: Response) => {
//   try {
//     const { order, driver, price } = req.body;
//     const orderPending = await orders.orderPending(order, driver, price);
//     res.status(201).json(orderPending);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// export const orderJourney = async (req: Request, res: Response) => {
//   try {
//     const { order, driver } = req.body;
//     const orderAccepted = await orders.orderAccepted(order, driver);
//     //TODO
//     //Track the order
//     //Send the order's status to the customer seq.

//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
