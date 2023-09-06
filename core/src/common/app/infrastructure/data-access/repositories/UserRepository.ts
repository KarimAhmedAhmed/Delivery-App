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
    return await this.userModel.findById(userId).exec();
  }

  async getUserByIdAndUpdate(userId: string, newUser: Partial<User>) {
    return await this.userModel.findByIdAndUpdate(userId, newUser).exec();
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
