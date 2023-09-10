import { User } from "../entities/User";
import { userRole } from "../types/userRole";
import { location } from "../types/location";

export abstract class UserRepository {
  abstract createUser(phoneNumber: String, role: userRole): Promise<string>;
  abstract verifyUser(phoneNumber: string, otp: string): Promise<boolean>;
  abstract getUserByPhoneNumber(phoneNumber: string): Promise<User>;
  // abstract setLocation(
  //   userId: string,
  //   liveLocation: location
  // ): Promise<boolean>;
  abstract getUserById(userId: string): Promise<User>;

  abstract getUserByPhoneNumberAndUpdate(
    phoneNumber: string,
    obj: object
  ): Promise<void>;

  abstract getUserByIdAndUpdate(userId: string, obj: object): Promise<User>;

  abstract getUsersByRole(role: userRole): Promise<User[]>;

  abstract findDriversByLocation(liveLoction: location): Promise<User[]>;
}
