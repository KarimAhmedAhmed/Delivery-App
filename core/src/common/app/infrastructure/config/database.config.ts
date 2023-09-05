import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://unifi-deliveryapp-db:HEtgFS8F2BEwm3eA@deliveryappdb.qme8cjh.mongodb.net/', {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;


