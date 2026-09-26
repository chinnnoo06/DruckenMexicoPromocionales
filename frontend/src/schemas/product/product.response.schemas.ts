import { z } from "zod";
import { ProductSchema } from "./product.schemas";

export const CarouselProductsResponseSchema = z.object({
  status: z.literal("success"),
  products: z.array(ProductSchema),
});

export const ProductResponseSchema = z.object({
  status: z.literal("success"),
  product: ProductSchema,
});

export const TotalProductsResponseSchema = z.object({
  status: z.literal("success"),
  count: z.number(),
});

export const CatalogProductsResponseSchema = z.object({
  status: z.literal("success"),
  products: z.array(ProductSchema),
  total: z.number(),
  page: z.number(),
  itemsPerPage: z.number(),
  pages: z.number()
});