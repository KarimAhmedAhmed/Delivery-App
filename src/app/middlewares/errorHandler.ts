import { NextFunction, Request, Response } from "express";
import { getStatusCodeForError } from "../utils/Wrapper";

const ErrorResponse = require("../utils/errorResponse");
// const config = require('../utils/config.json');

//status codes
const status = require("../config/status.json");

export const GlobalErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = getStatusCodeForError(error);
  let message = (error as Error).constructor.name;
  if (message.toLowerCase() === "error") {
    message = " Internal Server Error";
  }
  return response
    .status(statusCode || 500)
    .json({ error: error.message || message });
};
