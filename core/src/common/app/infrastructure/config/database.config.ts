import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('https://cloud.mongodb.com/v2/64f4757b9a18fe13ce40d770#/DeliveryAppDB', {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;


