import type { MetadataRoute } from "next";
import { SITE } from "@/utils/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Panel, API interna y carrito: no aportan nada al índice
      disallow: ["/admin", "/api", "/pedido"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
