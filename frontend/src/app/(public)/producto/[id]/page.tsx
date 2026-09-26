import type { Metadata } from "next";

import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { ProductSection } from "@/components/product/ProductSection";
import { getProductService } from "@/services/server/product.service";
import { GlobalImage } from "@/utils/constants";

export async function generateMetadata({ params }: PageProps<"/producto/[id]">): Promise<Metadata> {
  const { id } = await params;

  const product = await getProductService(id);

  if (!product) {
    return {
      title: "Producto no encontrado",
      robots: { index: false, follow: true },
    };
  }

  const title = product.name;
  const description = (
    product.description || `Conoce ${product.name}, artículo promocional personalizable con tu marca.`
  ).slice(0, 160);

  const image = product.generalImage ?? product.colors[0].image;
  const imageUrl = image ? `${GlobalImage.url}/${image}` : undefined;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      product.printingTechnique,
      product.material,
      "artículo promocional",
      "regalo corporativo",
    ],
    alternates: { canonical: `/producto/${id}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/producto/${id}`,
      images: imageUrl ? [{ url: imageUrl, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [{ url: imageUrl, alt: product.name }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/producto/[id]">) {
  const { id } = await params;

  const product = await getProductService(id);

  return (
    <>
      {product && <ProductStructuredData product={product} />}
      <ProductSection id={id} />
    </>
  );
}
