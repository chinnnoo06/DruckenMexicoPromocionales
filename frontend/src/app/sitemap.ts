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

/** Recorre todas las páginas de una categoría y devuelve sus productos y el total de páginas. */
const collectCategory = async (category: string) => {
  const products: TProduct[] = [];

  try {
    const first = await getCatalogProductsService(category, "1");
    products.push(...first.products);

    for (let page = 2; page <= first.pages; page++) {
      const next = await getCatalogProductsService(category, String(page));
      products.push(...next.products);
    }

    return { products, pages: first.pages };
  } catch {
    // Categoría sin productos: la API responde 404 y el servicio lanza
    return { products, pages: 0 };
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategoriesService().catch(() => []);

  const categoryRoutes: MetadataRoute.Sitemap = [];
  const productsById = new Map<string, TProduct>();

  const todos = await collectCategory("todos");
  todos.products.forEach((product) => productsById.set(product._id, product));

  // Páginas 2..N del catálogo general (la 1 ya está en las rutas estáticas)
  for (let page = 2; page <= todos.pages; page++) {
    categoryRoutes.push({
      url: `${SITE.url}/catalogo/todos/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const category of categories) {
    const slug = slugify(category.name);
    const { pages } = await collectCategory(slug);

    for (let page = 1; page <= pages; page++) {
      categoryRoutes.push({
        url: `${SITE.url}/catalogo/${slug}/${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === 1 ? 0.8 : 0.6,
      });
    }
  }

  const productRoutes: MetadataRoute.Sitemap = [...productsById.keys()].map((id) => ({
    url: `${SITE.url}/producto/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...STATIC_ROUTES, ...categoryRoutes, ...productRoutes];
}
