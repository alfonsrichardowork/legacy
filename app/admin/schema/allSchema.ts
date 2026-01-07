import z from "zod";

export const formSchemaCategory = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.string().min(1),
});