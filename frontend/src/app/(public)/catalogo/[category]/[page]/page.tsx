import type { Metadata } from "next";

import { CatalogSection } from "@/components/catalog/CatalogSection";
import { getCategoriesService } from "@/services/server/category.service";
import { slugify } from "@/utils/format";

export async function generateMetadata({ params }: PageProps<"/catalogo/[category]/[page]">): Promise<Metadata> {
  const { category, page } = await params;

  const categories = await getCategoriesService().catch(() => []);
  const match = categories.find((item) => slugify(item.name) === category);

  const isAll = category === "todos";
  const label = isAll ? "Artículos Promocionales" : (match?.name ?? category);
  const pageSuffix = page !== "1" ? ` · Página ${page}` : "";

  const title = isAll ? `Catálogo de ${label}${pageSuffix}` : `${label} Promocionales${pageSuffix}`;

  const description = isAll
    ? "Explora nuestro catálogo de artículos promocionales y regalos corporativos personalizables con tu marca. Serigrafía, bordado, sublimado, grabado láser y más."
    : `Descubre ${label.toLowerCase()} promocionales personalizables con tu logo. Cotiza con Drucken México, distribuidora de artículos promocionales desde 2016.`;

  const canonical = `/catalogo/${category}/${page}`;

  return {
    title,
    description,
    keywords: [
      `${label.toLowerCase()} promocionales`,
      `${label.toLowerCase()} personalizados`,
      "catálogo de artículos promocionales",
      "regalos corporativos",
      "promocionales con logo",
    ],
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CatalogPage({ params }: PageProps<"/catalogo/[category]/[page]">) {
  const { category, page } = await params;

  return <CatalogSection category={category} page={page} />;
}
