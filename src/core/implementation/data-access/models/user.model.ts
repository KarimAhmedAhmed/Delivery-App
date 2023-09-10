import mongoose, { Document, Model, Schema } from "mongoose";
import { userRole } from "../dtos/UserDTO";
import { location } from "../../../../../../../src/app/utils/Middlewares";

interface IUser extends Document {
  phoneNumber: string;
  password?: string;
  role: userRole;
  liveLocation?: location;
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
