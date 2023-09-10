import * as otpGenerator from "otp-generator";
import { MemoryCache } from "../repositories/MemoryCacheRepository";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { Request, Response, NextFunction } from "express";
import { TokenService } from "../../domain/services/Token";
import { userRole } from "../../domain/types/userRole";
import { PermissionError } from "../../utils/Errors";

dotenv.config();

let memoryCache = new MemoryCache();

export function createAccessToken(phoneNumber: string, role: userRole) {
  let secretKey = process.env.SECRET_KEY;
  const payload = { phoneNumber, role };
  const token = jwt.sign(payload, "12345", { expiresIn: "1h" }); // Token expires in 1 hour

  return token;
}

export async function checkAuthToken(token: string) {
  let user;
  function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    jwt.verify(token, "123", (err, user) => {
      if (err) {
        throw new PermissionError("Forbidden");
      }

      user = user;
    });
  }

  return user;
}

export function OTPGenerator(numbers: number): string {
  const otp = otpGenerator.generate(numbers, {
    digits: true,
    specialChars: true,
    lowerCaseAlphabets: true,
  });

  return otp;
}
