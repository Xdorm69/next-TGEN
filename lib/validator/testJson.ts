import { z } from "zod";

export const testSchema = z.object({
  name: z.string(),
  subject: z.string(),
  description: z.string(),
  questions: z.array(
    z.object({
      title: z.string(),
      difficulty: z.enum(["easy", "medium", "hard"]),
      options: z
        .array(
          z.object({
            title: z.string(),
            isCorrect: z.boolean(),
          }),
        )
        .min(2)
        .refine(
          (opts) => opts.filter((o) => o.isCorrect).length === 1,
          "Exactly one option must be correct",
        ),
    }),
  ),
});
