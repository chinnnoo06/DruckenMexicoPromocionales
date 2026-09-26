import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import ToastNotification from "@/components/ui/ToastNotificaction";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE } from "@/utils/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Artículos promocionales",
  keywords: [
    "artículos promocionales",
    "artículos promocionales México",
    "artículos promocionales Guadalajara",
    "artículos promocionales Zapopan",
    "regalos corporativos",
    "regalos de empresa",
    "promocionales personalizados",
    "publicidad para tu marca",
    "serigrafía",
    "tampografía",
    "sublimado",
    "esmaltados 2D",
    "grabado láser",
    "bordado",
    "rótulos publicitarios",
    "impresión DTF textil",
    "diseños especiales 3D",
    "Drucken México",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.shortDescription,
    images: [
      {
        url: SITE.ogImage,
        width: SITE.ogImageWidth,
        height: SITE.ogImageHeight,
        alt: SITE.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.shortDescription,
    images: [{ url: SITE.ogImage, alt: SITE.ogImageAlt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#9F531B",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${poppins.className} bg-[#f8dcc6]/50 text-[#1A1615] overflow-x-hidden`}>
      <body className="min-h-full flex flex-col">
        <StructuredData />
        <ReactQueryProvider>
          {children}
          <ToastNotification />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
