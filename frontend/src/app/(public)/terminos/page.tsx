import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso del sitio web y los servicios de Drucken México Promocionales: contacto, cotizaciones, propiedad intelectual y comunicaciones.",
  alternates: { canonical: "/terminos" },
  openGraph: {
    type: "website",
    title: "Términos y Condiciones",
    description:
      "Condiciones de uso del sitio web y los servicios de Drucken México Promocionales: contacto, cotizaciones, propiedad intelectual y comunicaciones.",
    url: "/terminos",
  },
};

export default function TermsPage() {
  return (
    <section className='max-w-[1600px] mx-auto px-4 lg:px-8 pb-10 pt-30'>
      <div className="mb-8">
        <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
          Términos y Condiciones
        </span>
        <h2 className='mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]'>
          Conococe Nuestros Terminos y Condiciones
        </h2>
        <p className="mt-4 text-[#1A1615]/75 text-base lg:text-lg leading-relaxed">
          Condiciones de uso de nuestro sitio web y servicios.
        </p>
      </div>

      <div className=" bg-linear-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/20 rounded-lg shadow-lg p-4 space-y-6">

        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">1. Aceptación de Términos</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, le recomendamos no usar nuestro sitio.
          </p>
        </div>

        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">2. Uso del Sitio Web</h3>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li>Este sitio web es propiedad de <span className='text-[#9F531B] font-medium'>Drucken México Promocionales</span></li>
            <li>El contenido está destinado únicamente para uso informativo y comercial</li>
            <li>Se prohíbe el uso no autorizado, reproducción o distribución del contenido</li>
            <li>Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento</li>
          </ul>
        </div>

        {/* Información y Contacto */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">3. Información y Contacto</h3>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li>La información proporcionada en el sitio web es para fines informativos</li>
            <li>Los precios y disponibilidad están sujetos a cambios sin previo aviso</li>
            <li>Las imágenes son representativas y pueden variar del producto final</li>
            <li>Para información actualizada, contáctenos directamente</li>
          </ul>
        </div>

        {/* Formulario de Contacto */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">4. Formulario de Contacto</h3>
          <p className="text-[#1A1615]/75 leading-relaxed">
            Al enviar información a través de nuestro formulario de contacto, usted:
          </p>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li>Proporciona información verdadera y precisa</li>
            <li>Consiente el tratamiento de sus datos personales</li>
            <li>Autoriza que nos comuniquemos con usted por WhatsApp</li>
            <li>Acepta recibir información comercial relacionada con nuestros servicios</li>
          </ul>
        </div>

        {/* Comunicaciones */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">5. Comunicaciones</h3>
          <p className="text-[#1A1615]/75 leading-relaxed text-sm lg:text-base">
            Nos comunicaremos con usted a través de:
          </p>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li><span className='text-[#9F531B] font-medium'>Email:</span> Para respuestas a consultas y cotizaciones</li>
            <li><span className='text-[#9F531B] font-medium'>WhatsApp:</span> Para respuestas a consultas y cotizaciones de forma más rápida</li>
          </ul>
          <p className="text-[#1A1615]/75 leading-relaxed text-sm lg:text-base mt-4">
            Puede solicitar la cancelación de comunicaciones en cualquier momento. Respetamos su privacidad y no compartimos su información con terceros.
          </p>
        </div>

        {/* Propiedad Intelectual */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">6. Propiedad Intelectual</h3>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li>Todo el contenido del sitio web es propiedad de <span className='text-[#9F531B] font-medium'>Drucken México Promocionales</span></li>
            <li>El logo esta protegido por derechos de autor</li>
            <li>Se prohíbe la reproducción sin autorización expresa</li>
            <li>Las imágenes de productos son propiedad de sus respectivos fabricantes</li>
          </ul>
        </div>

        {/* Limitación de Responsabilidad */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">7. Limitación de Responsabilidad</h3>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li>La información proporcionada es "tal como está" sin garantías</li>
            <li>No nos hacemos responsables por daños indirectos o consecuenciales</li>
            <li>No garantizamos la disponibilidad ininterrumpida del sitio web</li>
            <li>La responsabilidad máxima se limita al valor de los servicios contratados</li>
          </ul>
        </div>

        {/* Enlaces Externos */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">8. Enlaces Externos</h3>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li>Nuestro sitio puede contener enlaces a sitios web de terceros</li>
            <li>No somos responsables del contenido de sitios web externos</li>
            <li>Los enlaces se proporcionan únicamente para su conveniencia</li>
            <li>El uso de sitios externos está sujeto a sus propios términos</li>
          </ul>
        </div>

        {/* Modificaciones */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">9. Modificaciones</h3>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li>Nos reservamos el derecho de modificar estos términos en cualquier momento</li>
            <li>Los cambios entrarán en vigor inmediatamente después de su publicación</li>
            <li>Continuar usando el sitio después de los cambios constituye aceptación</li>
            <li>Notificaremos cambios importantes cuando sea posible</li>
          </ul>
        </div>

        {/* Ley Aplicable */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">10. Ley Aplicable</h3>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li>Estos términos se rigen por las leyes mexicanas</li>
            <li>Cualquier disputa se resolverá en los tribunales competentes de México</li>
            <li>Los términos están sujetos a cambios sin previo aviso</li>
            <li>La versión en español prevalece sobre cualquier traducción</li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">11. Contacto</h3>
          <p className="text-[#1A1615]/75 leading-relaxed text-sm lg:text-base">
            Para consultas sobre estos términos, contáctenos a través de:
          </p>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li><span className='text-[#9F531B] font-medium'>Email:</span> drucken2016@hotmail.com</li>
            <li><span className='text-[#9F531B] font-medium'>Teléfono:</span> +52 33 1587 6207</li>
            <li><span className='text-[#9F531B] font-medium'>WhatsApp:</span> +52 33 1587 6207</li>
          </ul>
        </div>

        {/* Información de la Empresa */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">12. Información de la Empresa</h3>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li><span className='text-[#9F531B] font-medium'>Nombre:</span> Drucken México Promocionales</li>
            <li><span className='text-[#9F531B] font-medium'>Servicios:</span> Artículos promocionales y servicios de impresión</li>
            <li><span className='text-[#9F531B] font-medium'>Años de experiencia:</span> Desde 2016</li>
            <li><span className='text-[#9F531B] font-medium'>Cobertura:</span> México</li>
          </ul>
        </div>

        {/* Fecha */}
        <div className="border-t border-[#9F531B]/25 pt-6">
          <p className="text-[#1A1615]/75 text-sm lg:text-base">
            <span className='text-[#9F531B] font-medium'>Última actualización:</span> Septiembre 2025<br />
          </p>
        </div>

      </div>

    </section>
  );
}
