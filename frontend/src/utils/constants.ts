import serigrafia from '../assets/images_services/serigrafia.webp';
import tampografia from '../assets/images_services/tampografia.webp';
import subliminado from '../assets/images_services/subliminado.webp';
import esmaltado2D from '../assets/images_services/esmaltado2D.webp';
import esmaltado2D2 from '../assets/images_services/esmaltado2D-2.webp';
import esmaltado2D3 from '../assets/images_services/esmaltado2D-3.webp';
import esmaltado2D4 from '../assets/images_services/esmaltado2D-4.webp';
import grabadoLaser from '../assets/images_services/grabadoLaser.webp';
import bordado from '../assets/images_services/bordado.webp';
import rotulosPublicitarios from '../assets/images_services/rotulosPublicitarios.webp';
import diseñosEspeciales3D from '../assets/images_services/diseñosEspeciales3D.webp';
import impresionDTFTextil from '../assets/images_services/impresionDTFTextil.webp';
import { FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

export const GlobalImage = {
  url: process.env.NEXT_PUBLIC_IMAGE_URL as string,
};

export const SITE = {
  name: "Drucken México",
  url: "https://drucken.com.mx",
  locale: "es_MX",
  title: "Drucken México | Artículos Promocionales y Regalos Corporativos",
  description:
    "Artículos promocionales y regalos corporativos en México. Especialistas en serigrafía, bordado, sublimado, grabado láser y publicidad para tu marca desde 2016.",
  shortDescription:
    "Artículos promocionales y regalos de empresa personalizados con tu marca. Serigrafía, bordado, sublimado, grabado láser y más.",
  ogImage: "/og-image.jpeg",
  ogImageType: "image/jpeg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Logotipo de Drucken México Promocionales, artículos promocionales y regalos corporativos",
} as const;

export const BUSINESS = {
  legalName: "Drucken México Promocionales",
  email: "drucken2016@hotmail.com",
  phone: "+523315876207",
  whatsapp: "523315876207",
  address: {
    street: "Ramón Corona 454, Unidad República",
    locality: "Zapopan",
    region: "Jalisco",
    postalCode: "45146",
    country: "MX",
  },
  foundingYear: 2016,
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "18:00",
  },
} as const;

export const services = [
  {
    id: 1,
    name: "Serigrafía",
    description: "Técnica de impresión que te permite plasmar tu marca en la mayoría de las superficies, brindándote acabados de excelente calidad.",
    image: serigrafia,
    className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2"
  },
  {
    id: 2,
    name: "Tampografía",
    description: "Si tu promocional tiene superficies irregulares, cilíndricas, esféricas, ángulos compuestos, texturas, superficies cóncavas, convexas o es un artículo blando, esta es la técnica ideal.",
    image: tampografia,
    className: "col-span-1 sm:col-span-2 sm:row-span-2 lg:col-span-4 lg:row-span-2"
  },
  {
    id: 3,
    name: "Subliminado",
    description: "Transfiere tus diseños en full color en tazas, reconocimientos, gorras, playeras, mochilas y cualquier tipo de textiles en una alta resolución, gran calidad y colorido.",
    image: subliminado,
    className: "col-span-1 sm:col-span-2 lg:col-span-2"
  },
  {
    id: 4,
    name: "Esmaltados 2D",
    description: "Imprime a todo color, con corte a la medida y gran durabilidad gracias a nuestras resinas de alta resitencia.",
    images: [esmaltado2D, esmaltado2D2, esmaltado2D3, esmaltado2D4],
    className: "col-span-1 sm:col-span-2 lg:col-span-2"
  },
  {
    id: 5,
    name: "Grabado Laser",
    description: "Da ese acabado elegante plasmando tu logo en una gran variedad de materiales como metales, orgánicos, madera, corcho, etc.",
    image: grabadoLaser,
    className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2"
  },
  {
    id: 6,
    name: "Bordado",
    description: "Plasma tu logo con una de nuestra gran gama de Polisedas, es ideal para playeras, gorras, mochilas, cangureras u otros textiles.",
    image: bordado,
    className: "col-span-1 sm:col-span-2 lg:col-span-2"
  },
  {
    id: 7,
    name: "Rótulos Publicitarios",
    description: "Técnica de impresión que te permite plasmar tu marca en la mayoría de las superficies, brindándote acabados de excelente calidad.",
    image: rotulosPublicitarios,
    className: "col-span-1 sm:col-span-2 lg:col-span-2"
  },
  {
    id: 8,
    name: "Diseños Especiales 3D",
    description: "Técnica de impresión que te permite plasmar tu marca en la mayoría de las superficies, brindándote acabados de excelente calidad.",
    image: diseñosEspeciales3D,
    className: "col-span-1 sm:col-span-2 lg:col-span-4"
  },
  {
    id: 9,
    name: "Impresión DTF Textil",
    description: "Técnica de impresión que te permite plasmar tu marca en la mayoría de las superficies, brindándote acabados de excelente calidad.",
    image: impresionDTFTextil,
    className: "col-span-1 sm:col-span-2 lg:col-span-2"
  }
]

export const catalogs = [
  {
    title: "General",
    href: "https://online.flippingbook.com/view/904760688/",
    icon: "📚"
  },
  {
    title: "Gorras",
    href: "https://drucken.com.mx/files/catalogo%20gorras.pdf",
    icon: "🧢"
  },
  {
    title: "Calendarios",
    href: "https://heyzine.com/flip-book/d6621be1e3.html",
    icon: "📅"
  },
  {
    title: "Sellos",
    href: "https://drucken.com.mx/files/catalogo%20sellos.pdf",
    icon: "🔖"
  }
];

export const contactDetails = [
  {
    icon: FaPhone,
    label: 'Teléfono',
    value: '+52 33 1587 6207',
    href: 'tel:+523315876207',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'drucken2016@hotmail.com',
    href: 'mailto:drucken2016@hotmail.com',
  },
  {
    icon: FaLocationDot,
    label: 'Dirección',
    value: 'Ramón Corona 454, Unidad República, Zapopan, Jalisco 45146',
  },
];


export const SOCIAL_LINKS = [
  {
    icon: FaFacebook,
    url: "https://www.facebook.com/share/1BaikYetVw/?mibextid=wwXIfr",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/drucken.promocionales?igsh=eGtjOHFldnR4aGE5",
    label: "Instagram",
  },
  {
    icon: FaWhatsapp,
    url: "https://wa.me/523315876207",
    label: "WhatsApp",
  },
];

export const WHATSAPP_NUMBER = "3315876207"