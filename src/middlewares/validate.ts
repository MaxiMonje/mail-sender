import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const issues = parsed.error.issues.map(i => ({
        path: i.path.join("."),
        message: i.message
      }));
      return res.status(400).json({ message: "Validation failed", issues });
    }
    req.body = parsed.data;
    next();
  };
