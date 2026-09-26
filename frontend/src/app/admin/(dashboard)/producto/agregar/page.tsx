import type { Metadata } from "next";

import { AddProduct } from "@/components/product/AddProduct";

export const metadata: Metadata = {
  title: "Agregar Producto | Panel de administrador",
  robots: { index: false, follow: false },
};

export default function AdminAddProductPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 pb-10 pt-30">
      <div className="mb-8">
        <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
          Agregar Producto
        </span>
        <h2 className="mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]">
          Agrega un Nuevo Producto
        </h2>
      </div>

      <AddProduct />
    </section>
  );
}
