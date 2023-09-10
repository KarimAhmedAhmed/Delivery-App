import { userRole } from "../../app/infrastructure/data-access/dtos/UserDTO";
import { User } from "../entities/User";

export abstract class TokenService {
  abstract createAccessToken(
    phoneNumber: string,
    role: userRole
  ): Promise<string>;

  abstract checkAuthToken(token: string): Promise<void>;
}
