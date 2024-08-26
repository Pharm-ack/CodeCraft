import { z } from "zod";

export const tipsSchema = z.object({
  title: z.string(),
  description: z.string(),
  language: z.enum(["Python", "Javascript", "Rust", "Go"]),
});
