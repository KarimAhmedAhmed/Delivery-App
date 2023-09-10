import { userRole } from "../types/userRole";

export abstract class TokenService {
  abstract createAccessToken(
    phoneNumber: string,
    role: userRole
  ): Promise<string>;

  abstract checkAuthToken(token: string): Promise<void>;
}
