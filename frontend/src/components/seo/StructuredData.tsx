import DruckenLogo from "@/assets/logodrucken.webp";
import { BUSINESS, SITE, SOCIAL_LINKS, services } from "@/utils/constants";

// Solo perfiles sociales: WhatsApp es un canal de contacto, no un perfil público
const socialProfiles = SOCIAL_LINKS.filter(({ label }) => label !== "WhatsApp").map(({ url }) => url);

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#negocio`,
  name: SITE.name,
  legalName: BUSINESS.legalName,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}${SITE.ogImage}`,
  logo: `${SITE.url}${DruckenLogo.src}`,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  foundingDate: String(BUSINESS.foundingYear),
  currenciesAccepted: "MXN",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  areaServed: [
    { "@type": "Country", name: "México" },
    { "@type": "City", name: "Zapopan" },
    { "@type": "City", name: "Guadalajara" },
  ],
  sameAs: socialProfiles,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: BUSINESS.openingHours.days,
      opens: BUSINESS.openingHours.opens,
      closes: BUSINESS.openingHours.closes,
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de personalización de artículos promocionales",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
    })),
  },
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: "es-MX",
  publisher: { "@id": `${SITE.url}/#negocio` },
};

export const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([localBusiness, website]),
    }}
  />
);
