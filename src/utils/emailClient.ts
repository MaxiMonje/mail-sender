import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS
} = process.env;

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT ?? 587),
  secure: String(SMTP_SECURE ?? "false") === "true",
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
});

// opcional: verificar conexión al arrancar
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log("📬 SMTP listo para enviar.");
  } catch (e) {
    console.error("❌ Error verificando SMTP:", e);
  }
}
