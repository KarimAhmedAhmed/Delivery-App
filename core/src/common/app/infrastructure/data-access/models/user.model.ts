import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
        _id: string;
        username: string;
        password: string;
        role: 'Admin' | 'Customer' | 'Driver';
    }

const UserSchema = new Schema<IUser>({
  _id: String,
  username: String,
  password: String,
  role: String
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;