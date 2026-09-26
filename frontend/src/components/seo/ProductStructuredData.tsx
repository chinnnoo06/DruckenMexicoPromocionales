import { TProduct } from "@/schemas/product/product.schemas";
import { GlobalImage, SITE } from "@/utils/constants";

export type TProductStructuredDataProps = {
  product: TProduct;
};

/** JSON-LD de Producto + migas de pan para la ficha pública de un artículo. */
export const ProductStructuredData = ({ product }: TProductStructuredDataProps) => {
  const productUrl = `${SITE.url}/producto/${product._id}`;

  const images = [product.generalImage, ...product.colors.map((color) => color.image)]
    .filter((image): image is string => Boolean(image))
    .map((image) => `${GlobalImage.url}/${image}`);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}/#producto`,
    name: product.name,
    description: product.description,
    sku: product.key,
    url: productUrl,
    image: images,
    material: product.material,
    category: product.category,
    color: product.colors.map((color) => color.color).join(", "),
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": `${SITE.url}/#negocio` },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Técnica de impresión", value: product.printingTechnique },
      { "@type": "PropertyValue", name: "Medidas", value: product.measures },
      { "@type": "PropertyValue", name: "Área de impresión", value: product.printingMeasures },
      { "@type": "PropertyValue", name: "Cantidad mínima", value: String(product.minQuantity) },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE.url}/catalogo/todos/1` },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([productSchema, breadcrumb]),
      }}
    />
  );
};
