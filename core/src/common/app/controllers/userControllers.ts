// controllers/orderController.ts
import { Request, Response } from "express";
import { Auth } from "../../domain/useCases/User";
import { UserRepositoryMongo } from "../infrastructure/data-access/repositories/UserRepository";
import { userRole } from "../infrastructure/data-access/dtos/UserDTO";
import { wrapper } from "../utils/Wrapper";
import { isPhoneNumber } from "class-validator";
import { tokenServiceMongo } from "../infrastructure/data-access/repositories/TokenRepositoryMongo";
import jwt from "jsonwebtoken";

let userRepository = new UserRepositoryMongo();
let tokenService = new tokenServiceMongo();

let auth = new Auth(userRepository, tokenService);

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
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");
  //  {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }
  const { userId } = req.params;
  const user = await auth.findUserByID(userId, token);
  res.status(201).json(user);
});

export const getUserByIdAndUpdate = wrapper(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized");
    const { userId } = req.params;
    const { obj } = req.body;
    const user = await auth.getUserByIdAndUpdate(userId, obj, token);
    res.status(201).json(user);
  }
);

export const getUsersByRole = wrapper(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");
  const { role } = req.params;
  const users = await auth.getUsersRole(role as userRole, token);
  res.status(201).json(users);
});
