import type { Metadata } from "next";

import { Footer } from "@/components/ui/footer/Footer";
import { Header } from "@/components/ui/header/Header";
import { verifySession } from "@/services/auth/auth.dal";

// Panel privado: fuera del índice de buscadores
export const metadata: Metadata = {
  title: "Panel de Administración",
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  await verifySession();

  return (
    <>
      <Header isAdmin />

      <main className="min-h-auto">{children}</main>

      <Footer isAdmin />
    </>
  );
}
