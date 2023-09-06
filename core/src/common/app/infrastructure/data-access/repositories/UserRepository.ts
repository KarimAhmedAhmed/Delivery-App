import UserModel from "../models/user.model";
import { UserRepository } from "../../../../domain/repositories/User";
import { User } from "../../../../domain/entities/User";
import { userRole } from "../dtos/UserDTO";
import { coordinates, location } from "../../../utils/Middlewares";

export class UserRepositoryMongo extends UserRepository {
  private readonly userModel = UserModel;

  async createUser(phoneNumber: string, role: userRole) {
    const user = new User(phoneNumber, role);
    const newUser = new this.userModel(user);
    await newUser.save();
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
      // liveLocation: {
      //   $near: {
      //     $geometry: liveLoction,
      //     $maxDistance: 1000,
      //   },
      // },
      role: "Driver",
    });
    return driversAroundOrderLocation;
  }
}
export default UserRepository;
