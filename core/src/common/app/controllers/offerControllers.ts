// controllers/orderController.ts
import { Request, Response } from "express";
import { wrapper } from "../utils/Wrapper";
import { OfferRepositoryMongo } from "../infrastructure/data-access/repositories/OfferRepository";
import { Offers } from "../../domain/useCases/Offers";
import { Orders } from "../../domain/useCases/Orders";
import { OrderRepositoryMongo } from "../infrastructure/data-access/repositories/OrderRepository";
import { UserRepositoryMongo } from "../infrastructure/data-access/repositories/UserRepository";

let offerRepository = new OfferRepositoryMongo();
let orderRepository = new OrderRepositoryMongo();
let userRepository = new UserRepositoryMongo();

let offers = new Offers(offerRepository);
let orders = new Orders(userRepository, orderRepository, offerRepository);

export const updateOffer = wrapper(async (req: Request, res: Response) => {
  const { offerId, obj } = req.body;
  const updatedOffer = await offers.updateOffer(offerId, obj);
  res.status(201).json(updatedOffer);
});

export const customerAcceptedDriverOffer = wrapper(
  async (req: Request, res: Response) => {
    const { offerId } = req.body;
    const offerAccepted = await offers.customerAcceptedDriverOffer(offerId);
    // const updateOrder = await orders.updateOrder(offerAccepted.order, { ""});
    res.status(201).json(offerAccepted);
  }
);

export const customerDeclinedDriverOffer = wrapper(
  async (req: Request, res: Response) => {
    const { offerId } = req.body;
    const offerDeclined = await offers.customerDeclinedDriverOffer(offerId);
    res.status(201).json(offerDeclined);
  }
);
