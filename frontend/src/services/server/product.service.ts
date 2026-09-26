import { cache } from "react";

import { ProductResponseSchema, TotalProductsResponseSchema } from "@/schemas/product/product.response.schemas";
import { TProduct } from "@/schemas/product/product.schemas";

export const getProductService = cache(async (id: string): Promise<TProduct | null> => {
  const url = `${process.env.API_URL}/products/${id}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Origin: process.env.DOMAIN as string,
    },
    next: { revalidate: 3600, tags: ["catalog", `product-${id}`] },
  });

  if (!req.ok) {
    return null;
  }

  const json = await req.json();

  const result = ProductResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /products/:id");
  }

  return result.data.product;
});

export const getTotalProductsService = async (): Promise<number> => {
  const url = `${process.env.API_URL}/products/count`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Origin: process.env.DOMAIN as string,
    },
    next: { revalidate: 3600, tags: ["catalog"] },
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = TotalProductsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /products/count");
  }

  return result.data.count;
};
