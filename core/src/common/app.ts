import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import {
  createOrder,
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
} from "./app/controllers/userControllers";
import connectDB from "./app/infrastructure/config/database.config";

const ip = require("ip");
const app: Application = express();
const port = process.env.PORT || 3000;
connectDB();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Define user routes
app.post("/api/register/:role", register);
app.post("/api/login/", login);
app.get("/api/user/:userId", getUserById);
app.get("/api/users/:role", getUsersByRole);
app.patch("/api/user/:userId", getUserByIdAndUpdate);

// Define order routes
app.post("/api/createOrder", createOrder);

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
