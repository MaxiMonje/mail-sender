import { transporter } from "../utils/emailClient";
import { SendMailDto } from "../validations/mail.validation";
import { renderTemplate } from "../utils/template";

export async function sendMail(data: SendMailDto) {
  const fromName = process.env.FROM_NAME || "Mailer";
  const fromEmail = process.env.FROM_EMAIL || "no-reply@example.com";

  let html = data.html;
  if (data.template) {
    html = await renderTemplate(data.template, {
      ...(data.variables || {}),
      brandName: process.env.FROM_NAME || "Turnos App",
      year: new Date().getFullYear()
    });
  }

  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: data.to,
    cc: data.cc,
    bcc: data.bcc,
    subject: data.subject,
    text: data.text,
    html,
    attachments: data.attachments
  });

  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response
  };
}
