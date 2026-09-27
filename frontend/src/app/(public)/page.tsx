import Image from "next/image";

import { Hero } from "@/components/home/Hero";
import heroBg from "@/assets/image-background.webp";
import { getCarouselProductsService } from "@/services/server/catalog.service";
import { getTotalProductsService } from "@/services/server/product.service";
import { HomeProductsCarousel } from "@/components/home/HomeProductsCarousel";
import { About } from "@/components/home/about/About";
import { OurServices } from "@/components/home/ourServices/OurServices";
import { Contact } from "@/components/home/contact/Contact";
import { ScrollToHash } from "@/components/ui/ScrollToHash";

export default async function HomePage() {
  // El total solo alimenta el sello del Hero: si falla, el inicio sigue cargando
  const [carouselProducts, totalProducts] = await Promise.all([
    getCarouselProductsService(),
    getTotalProductsService().catch(() => null),
  ])

  return (
    <>
      <ScrollToHash />

      <section id="inicio" aria-labelledby="inicio-title" className="relative isolate">
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />

        <Hero totalProducts={totalProducts} />
      </section>

      <section id="carrusel" className='py-10 lg:py-20'>
        <HomeProductsCarousel carouselProducts={carouselProducts} />
      </section>

      <section id="nosotros" className="bg-gray-50 py-10 lg:py-20">
        <About />
      </section>

      <section id="servicios" className='py-10 lg:py-20'>
        <OurServices />
      </section>

      <section id="contacto" className=" bg-gray-50 py-10 lg:py-20">
        <Contact />
      </section>
    </>
  );
}
