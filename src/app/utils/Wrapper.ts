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
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
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
