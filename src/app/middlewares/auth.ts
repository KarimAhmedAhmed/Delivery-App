import { NextFunction, Request, Response } from "express";
import { PermissionError } from "../../core/utils/Errors";
import { checkAuthToken } from "../../core/implementation/service/JWTTokenService";

export const ensureAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) throw new PermissionError("Unauthorized");
    //TODO:
    // validate the token and extract the payload of it
    const user = await checkAuthToken(token);
    console.log(user);
    if (!user) throw new PermissionError("Unauthorized");
    request.body.user = user;
    next();
  } catch (error) {
    next();
  }
};
