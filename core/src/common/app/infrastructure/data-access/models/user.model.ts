import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    password?: string;
    role: 'Admin' | 'Customer' | 'Driver';
}

const userSchema = new Schema<IUser>({
  username: String,
  password: String,
  role: String
});


const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;









