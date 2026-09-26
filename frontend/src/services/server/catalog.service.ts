import { CarouselProductsResponseSchema, CatalogProductsResponseSchema } from "@/schemas/product/product.response.schemas";
import { TProduct } from "@/schemas/product/product.schemas";

export const getCarouselProductsService = async (): Promise<TProduct[]> => {
  const url = `${process.env.API_URL}/products/carousel`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Origin: process.env.DOMAIN as string,
    },
    // Mismo tag que el catálogo: el carrusel muestra productos, así que caduca con ellos
    next: { revalidate: 3600, tags: ["catalog"] },
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = CarouselProductsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /products/carousel");
  }

  return result.data.products;
};

export type TCatalogPage = {
  products: TProduct[];
  pages: number;
};

export const getCatalogProductsService = async (category: string, page: string): Promise<TCatalogPage> => {
  const searchParams = new URLSearchParams({ category, page });

  const url = `${process.env.API_URL}/products?${searchParams.toString()}`;

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

  const result = CatalogProductsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /products");
  }

  return { products: result.data.products, pages: result.data.pages };
};
