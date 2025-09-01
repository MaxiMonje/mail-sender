import { Request, Response, NextFunction } from "express";
import * as mailService from "../services/mailService";

export const send = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await mailService.sendMail(req.body);
    res.status(202).json({ ok: true, ...result });
  } catch (err) {
    next(err);
  }
};
