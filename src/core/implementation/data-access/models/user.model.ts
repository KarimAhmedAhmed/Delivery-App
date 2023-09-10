import mongoose, { Document, Model, Schema } from "mongoose";
import { userRole } from "../../../domain/types/userRole";
import { location } from "../../../domain/types/location";

interface IUser extends Document {
  phoneNumber: string;
  password?: string;
  role: userRole;
  liveLocation?: location;
  isVerified: boolean;
}

const userSchema = new Schema<IUser>({
  phoneNumber: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: String, required: true },
  liveLocation: {
    name: String,
    coordinates: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number], // [longitude, latitude]
    },
  },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
