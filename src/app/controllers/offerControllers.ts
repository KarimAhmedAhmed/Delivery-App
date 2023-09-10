// controllers/orderController.ts
import { Request, Response } from "express";
import { wrapper } from "../utils/Wrapper";
import { OfferRepositoryMongo } from "../../../core/src/common/app/infrastructure/data-access/repositories/OfferRepository";
import { Offers } from "../../../core/src/common/domain/useCases/Offers";
import { Orders } from "../../../core/src/common/domain/useCases/Orders";
import { OrderRepositoryMongo } from "../../../core/src/common/app/infrastructure/data-access/repositories/OrderRepository";
import { UserRepositoryMongo } from "../../../core/src/common/app/infrastructure/data-access/repositories/UserRepository";
import { tokenServiceMongo } from "../../../core/src/common/app/infrastructure/data-access/repositories/TokenRepositoryMongo";

let offerRepository = new OfferRepositoryMongo();
let orderRepository = new OrderRepositoryMongo();
let userRepository = new UserRepositoryMongo();
let tokenService = new tokenServiceMongo();

let offers = new Offers(offerRepository);
let orders = new Orders(
  userRepository,
  orderRepository,
  offerRepository,
  tokenService
);

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
