import mongoose, { Document, Model, Schema } from "mongoose";
import { userRole } from "../dtos/UserDTO";

interface IUser extends Document {
  username: string;
  password?: string;
  role: userRole;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
