import type { Metadata } from "next";

import { CategoriesPanel } from "@/components/categories/CategoriesPanel";
import { getCategoriesService } from "@/services/server/category.service";
import { getTotalProductsService } from "@/services/server/product.service";

export const metadata: Metadata = {
  title: "Administrar Categorías | Panel de administrador",
  robots: { index: false, follow: false },
};

export default async function AdminCategoriesPage() {
  const [categories, totalProducts] = await Promise.all([
    getCategoriesService(),
    getTotalProductsService(),
  ]);

  return (
    <section className="max-w-[1600px] mx-auto px-4 lg:px-8 pb-10 pt-30">
      <div className="mb-8">
        <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
          Administrar Categorías
        </span>
        <h2 className="mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]">
          Administrar las Categorías de Productos
        </h2>
        <p className="mt-4 text-[#1A1615]/75 text-base lg:text-lg leading-relaxed">
          En este panel puedes administrar las categorías de productos registradas en el sistema, puedes agregar, editar o eliminar categorías.
        </p>
      </div>

      <CategoriesPanel categories={categories} totalProducts={totalProducts} />
    </section>
  );
}
