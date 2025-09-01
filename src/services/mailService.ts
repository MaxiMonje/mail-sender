import { transporter } from "../utils/emailClient";
import { SendMailDto } from "../validations/mail.validation";

export async function sendMail(data: SendMailDto) {
  const fromName = process.env.FROM_NAME || "Mailer";
  const fromEmail = process.env.FROM_EMAIL || "no-reply@example.com";

  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: data.to,
    cc: data.cc,
    bcc: data.bcc,
    subject: data.subject,
    text: data.text,
    html: data.html,
    attachments: data.attachments
  });

  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response
  };
}
