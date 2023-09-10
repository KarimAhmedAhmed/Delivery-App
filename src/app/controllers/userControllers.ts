import { Request, Response } from "express";
import { wrapper } from "../utils/Wrapper";
import { isPhoneNumber } from "class-validator";
import { UserRepositoryMongo } from "../../core/implementation/repositories/UserRepository";
import { Auth } from "../../core/domain/useCases/User";
import { userRole } from "../../core/domain/types/userRole";

let userRepository = new UserRepositoryMongo();

let auth = new Auth(userRepository);

export const register = wrapper(async (req: Request, res: Response) => {
  const { role } = req.params;
  const { phoneNumber } = req.body;
  const validatePhoneNumber = isPhoneNumber(phoneNumber, "EG");
  if (!validatePhoneNumber) throw new Error("Invalid phone number format");
  const user = await auth.register(phoneNumber, role as userRole);

  res.status(201).json(user);
});

export const verifyUser = wrapper(async (req: Request, res: Response) => {
  const { otp } = req.body;
  const verifyUser = await auth.verifyUser(otp);
  res.status(201).json(verifyUser);
});

export const login = wrapper(async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const validatePhoneNumber = isPhoneNumber(phoneNumber);
  if (!validatePhoneNumber) throw new Error("Invalid phone number format");
  const user = await auth.login(phoneNumber);
  res.status(201).json(user);
});

export const getUserById = wrapper(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await auth.findUserByID(userId);
  res.status(201).json(user);
});

export const getUserByIdAndUpdate = wrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { obj } = req.body;
    const user = await auth.getUserByIdAndUpdate(userId, obj);
    res.status(201).json(user);
  }
);

export const getUsersByRole = wrapper(async (req: Request, res: Response) => {
  const { role } = req.params;
  const users = await auth.getUsersRole(role as userRole);
  res.status(201).json(users);
});
