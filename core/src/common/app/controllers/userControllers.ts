// controllers/orderController.ts
import { Request, Response } from "express";
import { Auth } from "../../domain/useCases/Auth";
import { UserRepositoryMongo } from "../infrastructure/data-access/repositories/UserRepository";
import { userRole } from "../infrastructure/data-access/dtos/UserDTO";
import { wrapper } from "../utils/Wrapper";
import { isPhoneNumber } from "class-validator";

let userRepository = new UserRepositoryMongo();
let auth = new Auth(userRepository);

export const register = wrapper(async (req: Request, res: Response) => {
  const { role } = req.params;
  const { phoneNumber } = req.body;
  const validatePhoneNumber = isPhoneNumber(phoneNumber);
  if (!validatePhoneNumber) throw new Error("Invalid phone number format");
  const user = await auth.register(phoneNumber, role as userRole);
  res.status(201).json(user);
});

export const login = wrapper(async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const user = await auth.login(phoneNumber);
  res.status(201).json(user);
});
