import { userRole } from "../../app/infrastructure/data-access/dtos/UserDTO";
import UserRepository from "../../app/infrastructure/data-access/repositories/UserRepository";
import { User } from "../entities/User";

export class Auth {
  constructor(readonly userRepository: UserRepository) {}

  async register(phoneNumber: string, role: userRole) {
    const user = new User(phoneNumber, "Customer");
    const userCreated = await this.userRepository.createUser(phoneNumber, role);

    // if (!userCreated) throw new Error(`User ${username} not found`);
    // const accessToken = this.tokenService.createAccessToken(username);

    return { userCreated: userCreated };
  }

  async login(username: string) {
    const user = new User(username, "Customer");

    // const userCreated = await this.userRepository.createUser(user);
    // if (!userCreated) throw new Error(`User ${username} not found`);
    // const validUser = await this.passwordService.comparePassword(user.password, password);
    // if (!validUser) throw new Error(`invalid user`);
    // const accessToken = this.tokenService.createAccessToken(username);

    // return { accessToken: accessToken };
  }
}
