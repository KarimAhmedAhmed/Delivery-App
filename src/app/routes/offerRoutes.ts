import express from "express";
import {
  customerAcceptedDriverOffer,
  customerDeclinedDriverOffer,
  updateOffer,
} from "../controllers/offerControllers";
import { ensureAuth } from "../middlewares/auth";
const router = express.Router();

router.patch("/:offerId", ensureAuth, updateOffer);
router.patch("/accepted/:offerId", ensureAuth, customerAcceptedDriverOffer);
router.patch("/declined/:offerId", ensureAuth, customerDeclinedDriverOffer);

export const OfferRouter = router;
