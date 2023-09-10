import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { UserRouter } from "./app/routes/userRoutes";
import connectDB from "./app/infrastructure/config/database.config";
import { OrderRouter } from "./app/routes/orderRoutes";
import { OfferRouter } from "./app/routes/offerRoutes";

const ip = require("ip");
const app: Application = express();
const port = process.env.PORT || 3000;
connectDB();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());
app.use("/api/user/", UserRouter);
app.use("/api/order/", OrderRouter);
app.use("/api/offer/", OfferRouter);

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
