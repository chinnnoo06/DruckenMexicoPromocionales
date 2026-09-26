import { notFound } from "next/navigation";

import { CatalogsLinks } from "@/components/catalog/CatalogsLinks";
import { CatalogView } from "@/components/catalog/CatalogView";
import { getCatalogProductsService } from "@/services/server/catalog.service";

export type TCatalogSectionProps = {
  category: string;
  page: string;
  isAdmin?: boolean;
};

export const CatalogSection = async ({ category, page, isAdmin = false }: TCatalogSectionProps) => {
  const currentPage = Number(page);

  if (!Number.isInteger(currentPage) || currentPage < 1) {
    notFound();
  }

  const { products, pages } = await getCatalogProductsService(category, page);

  return (
    <section className="max-w-[1600px] mx-auto px-4 lg:px-8 pb-10 pt-30">
      <div className="mb-8">
        <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
          Catálogo
        </span>
        <h2 className="mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]">
          Nuestros Productos
        </h2>
        <p className="mt-4 text-[#1A1615]/75 text-base lg:text-lg leading-relaxed">
          Explora nuestros productos promocionales y revisa los catálogos completos en los siguientes enlaces.
        </p>

        <CatalogsLinks />
      </div>

      <CatalogView
        category={category}
        products={products}
        totalPages={pages}
        currentPage={currentPage}
        isAdmin={isAdmin}
      />
    </section>
  );
};
