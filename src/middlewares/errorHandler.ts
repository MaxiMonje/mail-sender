import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);
  const status = typeof err?.status === "number" ? err.status : 500;
  const message = err?.message ?? "Unexpected error";
  res.status(status).json({ message });
}
