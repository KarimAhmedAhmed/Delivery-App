import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {OrderController} from './controllers/orderControllers';
import Orders from './domain/useCases/Orders';
import { UserRepository } from './domain/repositories/User';
import { OrderRepository } from './domain/repositories/Order';
const app: Application = express();
const port = process.env.PORT || 3000;




// Handle 404 errors (route not found)
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Handle global errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});




// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Define your routes and controllers here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




