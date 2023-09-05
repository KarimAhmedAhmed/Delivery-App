import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createOrder, sendOrderToDrivers, orderPending, orderJourney } from './app/controllers/orderControllers';
import { register, login } from './app/controllers/userControllers';
import connectDB from './app/infrastructure/config/database.config';
import UserModel from './app/infrastructure/data-access/models/user.model';
import OrderModel from './app/infrastructure/data-access/models/order.model';
import UserRepository from './app/infrastructure/data-access/repositories/UserRepository';

const ip = require("ip");
const app: Application = express();
const port = process.env.PORT || 3000;
connectDB();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Define routes
app.post('/api/orders', createOrder);
app.post('/api/register/:role', register);


// Handle 404 errors (route not found)
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// // Handle global errors
// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
// });


// //test db connections
// const newUser = new UserModel({
//     _id: 1,
//     username: '+201113208828',
//     password: '1234',
//     role: 'Admin',
//   });
//  const saveUser = async ()=>{
//   try {
//     const savedUser = await newUser.save();
//     console.log('User saved:', savedUser);
//   } catch (error) {
//     console.error('Error saving user:', error);
//   }
// }

// saveUser().catch(console.error);





const host = ip.address();
app.listen(port, () => {
    console.log(`Server is running on port  ${port} at http://${host}:${port}/`);
});

