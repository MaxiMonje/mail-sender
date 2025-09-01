import { z } from "zod";

export const sendMailSchema = z.object({
  to: z.union([
    z.string().email(),
    z.array(z.string().email()).nonempty()
  ]),
  subject: z.string().min(1, { message: "subject is required" }),
  text: z.string().optional(),
  html: z.string().optional(),
  cc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  bcc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  attachments: z.array(z.object({
    filename: z.string(),
    content: z.string().optional(),
    path: z.string().optional(),
    contentType: z.string().optional()
  })).optional()
}).refine(v => v.text || v.html, { message: "Provide text or html" });

export type SendMailDto = z.infer<typeof sendMailSchema>;
