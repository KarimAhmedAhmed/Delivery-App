import * as otpGenerator from "otp-generator";
import { MemoryCache } from "./MemoryCacheRepository";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { TokenService } from "../../domain/services/Token";
import { userRole } from "../../domain/types/userRole";
dotenv.config();

let memoryCache = new MemoryCache();

export class tokenServiceMongo extends TokenService {
  async createAccessToken(phoneNumber: string, role: userRole) {
    let secretKey = process.env.SECRET_KEY;
    const payload = { phoneNumber, role };
    const token = jwt.sign(payload, "123", { expiresIn: "1h" }); // Token expires in 1 hour

    return token;
  }

  async checkAuthToken(token: string) {
    let user;
    function authenticateToken(
      req: Request,
      res: Response,
      next: NextFunction
    ): void {
      jwt.verify(token, "secretKey", (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }

        req.body.user = user;
      });
    }
    return user;
  }
}

export function generateTokenByPhoneNumber(phoneNumber: string): string {
  const token = otpGenerator.generate(30, {
    digits: true,
    specialChars: true,
    lowerCaseAlphabets: true,
  });

  // You can associate this token with the phoneNumber or perform any additional logic as needed

  return token;
}
