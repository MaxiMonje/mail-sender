import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import mailRouter from "./routes/mailRouter";
import errorHandler from "./middlewares/errorHandler";
import { verifyEmailConnection } from "./utils/emailClient";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3010;

// middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));

// anti-abuso básico (ajustá para prod)
app.use("/api/mail",
  rateLimit({ windowMs: 60_000, max: 60 }) // 60 req/min
);

// health
app.get("/health", (_req, res) => res.json({ ok: true }));

// rutas
app.use("/api/mail", mailRouter);

// error handler al final
app.use(errorHandler);

// start
app.listen(PORT, async () => {
  console.log(`📨 Mailer escuchando en http://localhost:${PORT}`);
  await verifyEmailConnection();
});
