import { coordinates } from "../../../app/utils/Middlewares";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/User";
import { userRole } from "../../domain/types/userRole";
import UserModel from "../data-access/models/user.model";
import { location } from "../../domain/types/location";
import { MemoryCache } from "./MemoryCacheRepository";
import { OTPGenerator } from "../service/JWTTokenService";
import { PermissionError } from "../../utils/Errors";

let memoryCache = new MemoryCache();
export class UserRepositoryMongo extends UserRepository {
  private readonly userModel = UserModel;

  async createUser(phoneNumber: string, role: userRole) {
    const user = new User(phoneNumber, role, false);
    const otp = OTPGenerator(6);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds.
    const expiryTimestamp = currentTimeInSeconds + 1800;
    await memoryCache.storeOTP(phoneNumber, otp, expiryTimestamp);
    const newUser = new this.userModel(user);
    await newUser.save();
    return otp;
  }

  async verifyUser(phoneNumber: string, otp: string) {
    const storedOTP = await memoryCache.getOTPEntry(phoneNumber);
    if (otp != storedOTP.otp) throw new PermissionError("Wrong OTP");
    await this.getUserByPhoneNumberAndUpdate(phoneNumber, { isVerified: true });
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
