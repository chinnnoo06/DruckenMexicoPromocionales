import { CategoriesResponseSchema } from "@/schemas/category/category.response.schemas";
import { TCategory } from "@/schemas/category/category.schemas";

export const getCategoriesService = async (): Promise<TCategory[]> => {
  const url = `${process.env.API_URL}/categories`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Origin: process.env.DOMAIN as string,
    },
    next: { revalidate: 3600, tags: ["categories"] },
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = CategoriesResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /categories");
  }

  return result.data.categories;
};
