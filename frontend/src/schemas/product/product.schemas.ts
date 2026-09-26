import { z } from "zod";

export const ProductColorSchema = z.object({
  color: z.string(),
  hex: z.string(),
  image: z.string().optional(),
});

export const ProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  key: z.string(),
  description: z.string(),
  colors: z.array(ProductColorSchema).min(1),
  generalImage: z.string().optional(),
  printingTechnique: z.string(),
  material: z.string(),
  measures: z.string(),
  printingMeasures: z.string(),
  category: z.string(),
  minQuantity: z.number(),
  span: z.string(),
});

export type TProductColor = z.infer<typeof ProductColorSchema>;

export type TProduct = z.infer<typeof ProductSchema>;
