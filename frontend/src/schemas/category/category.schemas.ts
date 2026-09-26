import { z } from "zod";

export const CategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  /** Solo lo usa el panel; opcional para no romper el desplegable público si falta. */
  productCount: z.number().optional(),
});

export type TCategory = z.infer<typeof CategorySchema>;
