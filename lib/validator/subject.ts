import z from "zod";

export const subjectSchema = z.object({
  name: z.string().min(2, "Name is required"),
  tags: z.array(z.string()),
  color: z.string(),
  description: z.string().optional(),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;