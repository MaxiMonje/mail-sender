import { Request, Response, NextFunction } from "express";

export function apiKey(req: Request, res: Response, next: NextFunction) {
  const header = req.header("x-api-key");
  if (!header || header !== process.env.API_KEY) {
    return res.status(401).json({ message: "Invalid API key" });
  }
  next();
}
