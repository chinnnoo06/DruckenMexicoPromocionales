import { z } from "zod";
import { CategorySchema } from "./category.schemas";

export const CategoriesResponseSchema = z.object({
  status: z.literal("success"),
  categories: z.array(CategorySchema),
});
