import type { Metadata } from "next";

import { HeaderSimple } from "@/components/ui/header/HeaderSimple";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLoginLayout({ children }: LayoutProps<"/admin/login">) {
  return (
    <>
      <HeaderSimple />

      <main className="flex-1">{children}</main>
    </>
  );
}
