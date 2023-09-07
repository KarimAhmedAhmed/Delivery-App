import { userRole } from "../../app/infrastructure/data-access/dtos/UserDTO";
import { location } from "../../app/utils/Middlewares";
import { User } from "../entities/User";

export abstract class UserRepository {
  abstract createUser(phoneNumber: String, role: userRole): Promise<void>;
  abstract verifyUser(otp: number): Promise<boolean>;
  abstract getUserByPhoneNumber(phoneNumber: string): Promise<User>;

  abstract getUserById(userId: string): Promise<User>;

  abstract getUserByPhoneNumberAndUpdate(
    phoneNumber: string,
    obj: object
  ): Promise<void>;

  abstract getUserByIdAndUpdate(userId: string, obj: object): Promise<User>;

  abstract getUsersByRole(role: userRole): Promise<User[]>;

  //   abstract findDriverByUsername(username: string, role: 'Driver'): Promise<User | null>
  abstract findDriversByLocation(liveLoction: location): Promise<User[]>;
}
