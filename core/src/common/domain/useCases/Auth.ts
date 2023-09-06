import { IsPhoneNumber } from "class-validator";
import { userRole } from "../../app/infrastructure/data-access/dtos/UserDTO";
import UserRepository from "../../app/infrastructure/data-access/repositories/UserRepository";
import { User } from "../entities/User";

export class Auth {
  constructor(readonly userRepository: UserRepository) {}

  async register(phoneNumber: string, role: userRole) {
    const user = new User(phoneNumber, role);
    const userCreated = await this.userRepository.createUser(phoneNumber, role);

    // if (!userCreated) throw new Error(`User ${username} not found`);
    // const accessToken = this.tokenService.createAccessToken(username);

    return { userCreated: userCreated };
  }

  async login(phoneNumber: string) {
    const user = this.userRepository.getUserByPhoneNumber(phoneNumber);
    if (!user) throw new Error(`User not found`);
    // const userCreated = await this.userRepository.createUser(user);
    // if (!userCreated) throw new Error(`User ${username} not found`);
    // const validUser = await this.passwordService.comparePassword(user.password, password);
    // if (!validUser) throw new Error(`invalid user`);
    // const accessToken = this.tokenService.createAccessToken(username);

    return user;
  }

  async findUserByID(userId: string) {
    const user = this.userRepository.getUserById(userId);
    return user;
  }
  async getUsersRole(role: userRole) {
    const users = this.userRepository.getUsersByRole(role);
    return users;
  }
  async getUserByIdAndUpdate(userId: string, obj: object) {
    const user = this.userRepository.getUserByIdAndUpdate(userId, obj);
    return user;
  }
}
