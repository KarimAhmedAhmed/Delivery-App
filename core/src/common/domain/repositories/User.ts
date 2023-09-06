import { userRole } from "../../app/infrastructure/data-access/dtos/UserDTO";
import { location } from "../../app/utils/Middlewares";
import { User } from "../entities/User";

export abstract class UserRepository {
  abstract createUser(phoneNumber: String, role: userRole): Promise<void>;
  //   abstract findCustomerByUsername(username: string, role: 'Customer'): Promise<User | null>;
  //   abstract findDriverByUsername(username: string, role: 'Driver'): Promise<User | null>
  abstract findDriversByLocation(
    liveLoction: location
  ): Promise<Partial<User[]>>;
}
