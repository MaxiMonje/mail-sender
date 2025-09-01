import { Router } from "express";
import { send } from "../controllers/mailController";
import { validate } from "../middlewares/validate";
import { sendMailSchema } from "../validations/mail.validation";

const router = Router();

router.post("/send", validate(sendMailSchema), send);

export default router;
