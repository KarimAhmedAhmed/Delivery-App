import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrder,
} from "../controllers/orderControllers";
import { ensureAuth } from "../middlewares/auth";
const router = express.Router();

router.post("/", ensureAuth, createOrder);
router.patch("/", ensureAuth, updateOrder);
router.get("/", ensureAuth, getOrderById);

export const OrderRouter = router;
