import type { Metadata } from "next";

import { OrderView } from "@/components/order/OrderView";

export const metadata: Metadata = {
  title: "Tu Pedido",
  description:
    "Revisa los artículos promocionales que has seleccionado y solicita tu cotización con Drucken México.",
  alternates: { canonical: "/pedido" },
  robots: { index: false, follow: true },
};

export default function OrderPage() {
  return (
    <section className="max-w-[1600px] mx-auto px-4 lg:px-8 pb-10 pt-30">
      <div className="mb-8">
        <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
          Pedido
        </span>
        <h2 className="mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]">
          Tu Pedido
        </h2>
        <p className="mt-4 text-[#1A1615]/75 text-base lg:text-lg leading-relaxed">
          Todo lo que has elegido está aquí, listo para ti.
        </p>
      </div>

      <OrderView />
    </section>
  );
}
