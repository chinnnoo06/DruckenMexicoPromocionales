import type { Metadata } from "next";

import { ProductSection } from "@/components/product/ProductSection";

export const metadata: Metadata = {
  title: "Producto | Panel de administrador",
  robots: { index: false, follow: false },
};

export default async function AdminProductPage({ params }: PageProps<"/admin/producto/[id]">) {
  const { id } = await params;

  return <ProductSection id={id} isAdmin />;
}
