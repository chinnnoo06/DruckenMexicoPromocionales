import type { Metadata } from "next";
import Link from "next/link";
import { primaryButton } from "@/utils/styles/button";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o cambió de dirección. Vuelve al inicio de Drucken México o explora nuestro catálogo de artículos promocionales.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="font-semibold text-6xl lg:text-7xl tracking-tight text-[#9F531B]">404</h1>
      <p className="text-xl lg:text-2xl mt-4 mb-6 text-[#1A1615]/75 ">
        Oops! La página que buscas no existe.
      </p>
      <Link href='/' className={primaryButton}>
        Volver al inicio
      </Link>
    </section>
  );
}
