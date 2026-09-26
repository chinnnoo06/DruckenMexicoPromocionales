import { notFound } from "next/navigation";

import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb";
import { ProductDetail } from "@/components/product/ProductDetail";
import { getProductService } from "@/services/server/product.service";

export type TProductSectionProps = {
  id: string;
  isAdmin?: boolean;
};

export const ProductSection = async ({ id, isAdmin = false }: TProductSectionProps) => {
  const product = await getProductService(id);

  if (!product) {
    notFound();
  }

  return (
    <section className="max-w-[1600px] mx-auto px-4 lg:px-8 pb-10 pt-30">
      <div className="mb-8">
        <ProductBreadcrumb productName={product.name} isAdmin={isAdmin} />
      </div>

      <ProductDetail product={product} isAdmin={isAdmin} />
    </section>
  );
};
