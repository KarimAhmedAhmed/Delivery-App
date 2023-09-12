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

export async function createAccessToken(phoneNumber: string, role: userRole) {
  let secretKey = process.env.SECRET_KEY;
  const payload = { phoneNumber, role };
  const token = jwt.sign(payload, "12345", { expiresIn: "24h" }); // Token expires in 24 hours
  await memoryCache.storeToken(phoneNumber, token);

  return token;
}

export async function checkAuthToken(token: string) {
  console.log("us", token);
  let user;
  function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    jwt.verify(token, "12345", async (err, user) => {
      if (err) {
        throw new PermissionError("Forbidden");
      }
      console.log(user);
    });
  }
  return user;
}

export function OTPGenerator(numbers: number): string {
  const otp = otpGenerator.generate(numbers, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
}
