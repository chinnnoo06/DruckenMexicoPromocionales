import type { MetadataRoute } from "next";

import { getCatalogProductsService } from "@/services/server/catalog.service";
import { getCategoriesService } from "@/services/server/category.service";
import { TProduct } from "@/schemas/product/product.schemas";
import { SITE } from "@/utils/constants";
import { slugify } from "@/utils/format";

// El catálogo vive en la API: se regenera con la misma cadencia que su caché
export const revalidate = 3600;

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${SITE.url}`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  { url: `${SITE.url}/catalogo/todos/1`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE.url}/terminos`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE.url}/privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
];

/** Obtiene solo la primera página de una categoría para recopilar sus productos. */
const collectFirstPage = async (category: string) => {
  try {
    const first = await getCatalogProductsService(category, "1");
    return first.products;
  } catch {
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategoriesService().catch(() => []);

  const productsById = new Map<string, TProduct>();

  const todosProducts = await collectFirstPage("todos");
  todosProducts.forEach((product) => productsById.set(product._id, product));

  // Una URL por categoría (solo página 1)
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE.url}/catalogo/${slugify(category.name)}/1`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Productos individuales — recorremos todas las categorías para descubrirlos todos
  for (const category of categories) {
    const products = await collectFirstPage(slugify(category.name));
    products.forEach((product) => productsById.set(product._id, product));
  }

  const productRoutes: MetadataRoute.Sitemap = [...productsById.keys()].map((id) => ({
    url: `${SITE.url}/producto/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...STATIC_ROUTES, ...categoryRoutes, ...productRoutes];
}
