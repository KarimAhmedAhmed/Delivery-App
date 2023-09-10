import { createAccessToken } from "../../implementation/service/JWTTokenService";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User";
import { userRole } from "../types/userRole";

export class Auth {
  constructor(readonly userRepository: UserRepository) {}

  async register(phoneNumber: string, role: userRole) {
    const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
    if (user) throw new Error(`This phonenumber is already used`);
    new User(phoneNumber, role);
    const userCreated = await this.userRepository.createUser(phoneNumber, role);
    const accessToken = createAccessToken(phoneNumber, role);

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
    const accessToken = createAccessToken(phoneNumber, user.role);

    return { user, accessToken };
  }

  async findUserByID(userId: string) {
    const user = await this.userRepository.getUserById(userId);
    return user;
  }
  async getUsersRole(role: userRole) {
    const users = await this.userRepository.getUsersByRole(role);
    return users;
  }
  async getUserByIdAndUpdate(userId: string, obj: object) {
    const user = await this.userRepository.getUserByIdAndUpdate(userId, obj);
    return user;
  }
}
