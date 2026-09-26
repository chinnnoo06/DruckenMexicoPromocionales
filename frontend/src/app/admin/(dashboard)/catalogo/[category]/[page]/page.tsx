import type { Metadata } from "next";

import { CatalogSection } from "@/components/catalog/CatalogSection";

export const metadata: Metadata = {
  title: "Catálogo | Panel de administrador",
  robots: { index: false, follow: false },
};

export default async function AdminCatalogPage({ params }: PageProps<"/admin/catalogo/[category]/[page]">) {
  const { category, page } = await params;

  return <CatalogSection category={category} page={page} isAdmin />;
}
