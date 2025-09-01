import { z } from "zod";

export const sendMailSchema = z.object({
  to: z.string().email().or(z.array(z.string().email()).nonempty()),
  subject: z.string().min(1),
  text: z.string().optional(),
  html: z.string().optional(),
  template: z.string().optional(),                  // p.ej. "reset-password"
  variables: z.record(z.string(), z.any()).optional(), // <— FIX: record(keyType, valueType)
  cc: z.string().email().or(z.array(z.string().email())).optional(),
  bcc: z.string().email().or(z.array(z.string().email())).optional(),
  attachments: z.array(z.object({
    filename: z.string(),
    content: z.string().optional(),
    path: z.string().optional(),
    contentType: z.string().optional()
  })).optional()
}).refine(v => v.text || v.html || v.template, {
  message: "Provide text, html or template"
});

export type SendMailDto = z.infer<typeof sendMailSchema>;
