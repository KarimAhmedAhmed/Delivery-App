import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import {
  createOrder,
  getOrderById,
  updateOrder,
  //   sendOrderToDrivers,
  //   orderPending,
  //   orderJourney,
} from "./app/controllers/orderControllers";
import {
  register,
  login,
  getUserById,
  getUserByIdAndUpdate,
  getUsersByRole,
  verifyUser,
} from "./app/controllers/userControllers";
import {
  customerAcceptedDriverOffer,
  customerDeclinedDriverOffer,
  updateOffer,
} from "./app/controllers/offerControllers";
import { UserRouter } from "./app/routes/userRoutes";
import connectDB from "./app/infrastructure/config/database.config";

const ip = require("ip");
const app: Application = express();
const port = process.env.PORT || 3000;
connectDB();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());
app.use("/api/user/", UserRouter);

// Define order routes
app.post("/api/order", createOrder);
app.patch("/api/order", updateOrder);
app.get("/api/order", getOrderById);

//Define offer routes
app.patch("/api/offer", updateOffer);
app.patch("/api/offer/accepted", customerAcceptedDriverOffer);
app.patch("/api/offer/declined", customerDeclinedDriverOffer);

// Handle 404 errors (route not found)
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// // Handle global errors
// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
// });

const host = ip.address();
app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}/`);
});
