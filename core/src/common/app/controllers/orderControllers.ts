// controllers/orderController.ts
import { Request, Response } from "express";
import { Orders } from "../../domain/useCases/Orders";
import { OrderRepositoryMongo } from "../infrastructure/data-access/repositories/OrderRepository";
import { wrapper } from "../utils/Wrapper";
import { UserRepositoryMongo } from "../infrastructure/data-access/repositories/UserRepository";
import { OfferRepository } from "../../domain/repositories/Offer";
import { OfferRepositoryMongo } from "../infrastructure/data-access/repositories/OfferRepository";
import { tokenServiceMongo } from "../infrastructure/data-access/repositories/TokenRepositoryMongo";

let orderRepository = new OrderRepositoryMongo();
let userRepository = new UserRepositoryMongo();
let offerRepository = new OfferRepositoryMongo();
let tokenService = new tokenServiceMongo();

let orders = new Orders(
  userRepository,
  orderRepository,
  offerRepository,
  tokenService
);

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
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");
  const { orderId, obj } = req.body;
  const updatedOrder = await orders.updateOrder(orderId, obj, token);
  res.status(201).json(updatedOrder);
});

export const getOrderById = wrapper(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");
  //  {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }
  const { orderId } = req.params;
  const order = await orders.getOrderById(orderId, token);
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
