import { Request, Response } from "express";
import {
  NotFoundError,
  PermissionError,
  ValidationError,
} from "../../core/utils/Errors";
type func = (req: Request, res: Response) => Promise<void>;
export const wrapper = (func: func) => {
  return async (req: Request, res: Response) => {
    try {
      await func(req, res);
    } catch (error: any) {
      console.log(error);
      const statusCode = getStatusCodeForError(error);
      let message = (error as Error).constructor.name;
      if (message.toLowerCase() === "error") {
        message = "Internal Server Error";
      }
      return res
        .status(statusCode || 500)
        .json({ error: error.message || message });
    }
  };
};

export function getStatusCodeForError(error: Error) {
  switch (error.constructor) {
    case PermissionError:
      return 401;
    case NotFoundError:
      return 404;
    case ValidationError:
      return 400;
  }

  return 500;
}
