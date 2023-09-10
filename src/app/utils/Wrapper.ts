import { Request, Response } from "express";
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
