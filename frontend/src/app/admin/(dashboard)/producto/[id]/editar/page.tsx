import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditProduct } from "@/components/product/EditProduct";
import { getProductService } from "@/services/server/product.service";

export const metadata: Metadata = {
  title: "Editar Producto | Panel de administrador",
  robots: { index: false, follow: false },
};

export default async function AdminEditProductPage({ params }: PageProps<"/admin/producto/[id]/editar">) {
  const { id } = await params;

  const product = await getProductService(id);

  if (!product) {
    notFound();
  }

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 pb-10 pt-30">
      <div className="mb-8">
        <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
          Editar Producto
        </span>
        <h2 className="mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]">
          Editar un Producto Existente
        </h2>
      </div>

      <EditProduct product={product} />
    </section>
  );
}
