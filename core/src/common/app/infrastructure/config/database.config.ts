import { MongoClient } from 'mongodb';

const uri = 'https://cloud.mongodb.com/v2/64f4757b9a18fe13ce40d770#'; // Replace with your MongoDB connection string
const dbName = 'DeliveryAppDB'; // Replace with your database name

const client = new MongoClient(uri);

async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
    // Close the connection when done
    await client.close();
  }
}

export { client, connectToMongo };


