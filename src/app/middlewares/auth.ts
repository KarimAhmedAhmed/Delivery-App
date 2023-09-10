import { NextFunction, Request, Response } from "express";
import { PermissionError } from "../../core/utils/Errors";

export const ensureAuth = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) throw new PermissionError("Unauthorized");

    request.token = token;

    //TODO:
    // validate the token and extract the payload of it
    const user = jwtVerifyAccessToken(token);

    if (!user) throw new PermissionError("Unauthorized");
    request.user = user;

    next();
  } catch (error) {
    next();
  }
};
