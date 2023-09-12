import { Request, Response } from "express";
import { wrapper } from "../utils/Wrapper";
import { OfferRepositoryMongo } from "../../core/implementation/repositories/OfferRepository";
import { OrderRepositoryMongo } from "../../core/implementation/repositories/OrderRepository";
import { UserRepositoryMongo } from "../../core/implementation/repositories/UserRepository";
import { Offers } from "../../core/domain/useCases/Offers";
import { Orders } from "../../core/domain/useCases/Orders";

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
    const { offerId } = req.params;
    const offerAccepted = await offers.customerAcceptedDriverOffer(offerId);
    await orders.orderAccepted(offerAccepted);
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
