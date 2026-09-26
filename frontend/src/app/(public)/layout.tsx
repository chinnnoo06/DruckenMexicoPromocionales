import { Footer } from "@/components/ui/footer/Footer";
import { Header } from "@/components/ui/header/Header";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />

      <main className="min-h-auto">{children}</main>

      <Footer />
    </>
  );
}
