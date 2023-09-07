import { IsPhoneNumber } from "class-validator";
import { userRole } from "../../app/infrastructure/data-access/dtos/UserDTO";
import UserRepository from "../../app/infrastructure/data-access/repositories/UserRepository";
import { User } from "../entities/User";
import { TokenService } from "../services/Token";

export class Auth {
  constructor(
    readonly userRepository: UserRepository,
    readonly tokenService: TokenService
  ) {}

  async register(phoneNumber: string, role: userRole) {
    const user = new User(phoneNumber, role);
    const userCreated = await this.userRepository.createUser(phoneNumber, role);

    const accessToken = await this.tokenService.createAccessToken(
      phoneNumber,
      role
    );

    return { userCreated: userCreated, accessToken: accessToken };
  }

  async verifyUser(otp: number) {
    const sentOTP = 123456;
    if (otp != sentOTP) throw new Error("Wrong OTP");
    return true;
  }

  async login(phoneNumber: string) {
    const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
    if (!user) throw new Error(`User not found`);
    const accessToken = await this.tokenService.createAccessToken(
      phoneNumber,
      user.role
    );

    return { user, accessToken };
  }

  async findUserByID(userId: string, token: string) {
    await this.tokenService.checkAuthToken(token);
    const user = await this.userRepository.getUserById(userId);
    return user;
  }
  async getUsersRole(role: userRole, token: string) {
    await this.tokenService.checkAuthToken(token);
    const users = await this.userRepository.getUsersByRole(role);
    return users;
  }
  async getUserByIdAndUpdate(userId: string, obj: object, token: string) {
    await this.tokenService.checkAuthToken(token);
    const user = await this.userRepository.getUserByIdAndUpdate(userId, obj);
    return user;
  }
}
