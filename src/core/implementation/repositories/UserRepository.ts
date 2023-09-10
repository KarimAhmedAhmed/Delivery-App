import { coordinates } from "../../../app/utils/Middlewares";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/User";
import { userRole } from "../../domain/types/userRole";
import UserModel from "../data-access/models/user.model";
import { location } from "../../domain/types/location";

export class UserRepositoryMongo extends UserRepository {
  private readonly userModel = UserModel;

  async createUser(phoneNumber: string, role: userRole) {
    const user = new User(phoneNumber, role);
    const newUser = new this.userModel(user);
    await newUser.save();
  }

  async verifyUser(otp: number) {
    const sentOTP = 123456;
    if (otp != sentOTP) throw new Error("Wrong OTP");
    return true;
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    return user as User;
  }

  async getUserByPhoneNumber(phoneNumber: string) {
    const user = await this.userModel
      .findOne({ phoneNumber: phoneNumber })
      .exec();
    return user as User;
  }

  async getUserByIdAndUpdate(userId: string, obj: object) {
    const user = await this.userModel
      .findByIdAndUpdate(userId, obj, { new: true })
      .exec();
    return user as User;
  }

  async getUserByPhoneNumberAndUpdate(phoneNumber: string, obj: object) {
    await this.userModel
      .findOneAndUpdate({ phoneNumber }, obj, { new: true })
      .exec();
  }
  async getUsersByRole(role: userRole) {
    const users = await this.userModel.find({ role }).exec();
    return users as User[];
  }

  async findDriversByLocation(liveLoction: location) {
    const newcoordinates = coordinates(liveLoction, 1000);
    const driversAroundOrderLocation = await this.userModel.find({
      liveLocation: newcoordinates,
      role: "Driver",
    });
    return driversAroundOrderLocation;
  }
}
export default UserRepository;
