import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createOrder, sendOrderToDrivers, orderPending, orderJourney } from './app/controllers/orderControllers';
import { register, login } from './app/controllers/userControllers';

const app: Application = express();
const port = process.env.PORT || 3000;

// Define routes
app.post('/api/orders', createOrder);
// Add more routes for other resources
app.post('/api/register', register )
// Handle 404 errors (route not found)
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// // Handle global errors
// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
// });



// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Define your routes and controllers here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




