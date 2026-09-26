import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Conoce cómo Drucken México Promocionales recopila, usa y protege tus datos personales al contactarnos o solicitar una cotización.",
  alternates: { canonical: "/privacidad" },
  openGraph: {
    type: "website",
    title: "Política de Privacidad",
    description:
      "Conoce cómo Drucken México Promocionales recopila, usa y protege tus datos personales al contactarnos o solicitar una cotización.",
    url: "/privacidad",
  },
};

export default function PrivacyPage() {
  return (
    <section className='max-w-[1600px] mx-auto px-4 lg:px-8 pb-10 pt-30'>
      <div className="mb-8">
        <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
          Política de Privacidad
        </span>
        <h2 className='mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]'>
          Conococe Nuestras Políticas de Privacidad
        </h2>
        <p className="mt-4 text-[#1A1615]/75 text-base lg:text-lg leading-relaxed">
          Información sobre cómo recopilamos, usamos y protegemos tus datos personales.
        </p>
      </div>

      <div className=" bg-linear-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/25 rounded-lg shadow-lg p-4 space-y-6">

        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">1. Responsable del Tratamiento</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            <span className='text-[#9F531B] font-medium'>Drucken México Promocionales</span><br />
            Empresa mexicana dedicada a la distribución de artículos promocionales desde 2016.<br />
            <span className='text-[#9F531B] font-medium'>Email:</span> drucken2016@hotmail.com<br />
            <span className='text-[#9F531B] font-medium'>Teléfono:</span> +52 33 1587 6207
          </p>
        </div>

        {/* Datos Recopilados */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">2. Datos que Recopilamos</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            Solo recopilamos la información que nos proporcionas voluntariamente a través de nuestro formulario de contacto:
          </p>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li><span className='text-[#9F531B] font-medium'>Nombre:</span> Para identificarte y personalizar nuestra comunicación</li>
            <li><span className='text-[#9F531B] font-medium'>Título del mensaje:</span> Para entender el tema de tu consulta</li>
            <li><span className='text-[#9F531B] font-medium'>Contenido del mensaje:</span> Para atender tu solicitud específica</li>
          </ul>
        </div>

        {/* Propósito */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">3. Propósito del Tratamiento</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            Utilizamos tus datos personales únicamente para:
          </p>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li>Responder a tu consulta o solicitud</li>
            <li>Proporcionarte información sobre nuestros productos y servicios</li>
            <li>Enviarte cotizaciones y propuestas comerciales</li>
            <li>Mantener comunicación contigo por email y WhatsApp</li>
          </ul>
        </div>

        {/* Base Legal */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">4. Base Legal</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            El tratamiento de tus datos personales se basa en:
          </p>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li><span className='text-[#9F531B] font-medium'>Consentimiento:</span> Al enviar el formulario, consientes el tratamiento de tus datos</li>
            <li><span className='text-[#9F531B] font-medium'>Interés legítimo:</span> Para brindarte el mejor servicio y atención</li>
          </ul>
        </div>

        {/* Almacenamiento */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">5. Almacenamiento y Seguridad</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            <span className='text-[#9F531B] font-medium'>Tiempo de retención:</span> Tus datos se conservan únicamente el tiempo necesario para atender tu consulta y mantener comunicación contigo.<br /><br />
            <span className='text-[#9F531B] font-medium'>Medidas de seguridad:</span> Implementamos medidas técnicas y organizativas para proteger tus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.
          </p>
        </div>

        {/* Compartir Datos */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">6. Compartir Información</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            <span className='text-[#9F531B] font-medium'>No vendemos, alquilamos o compartimos</span> tus datos personales con terceros, excepto:
          </p>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li>Cuando sea requerido por ley o autoridad competente</li>
            <li>Con tu consentimiento expreso</li>
            <li>Para procesar tu solicitud (proveedores de servicios necesarios)</li>
          </ul>
        </div>

        {/* Derechos */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">7. Tus Derechos</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            Tienes derecho a:
          </p>
          <ul className="list-disc list-inside text-[#1A1615]/75 text-sm lg:text-base ml-4 space-y-2">
            <li><span className='text-[#9F531B] font-medium'>Acceso:</span> Solicitar información sobre los datos que tenemos de ti</li>
            <li><span className='text-[#9F531B] font-medium'>Rectificación:</span> Corregir datos inexactos o incompletos</li>
            <li><span className='text-[#9F531B] font-medium'>Cancelación:</span> Solicitar la eliminación de tus datos</li>
            <li><span className='text-[#9F531B] font-medium'>Oposición:</span> Oponerte al tratamiento de tus datos</li>
            <li><span className='text-[#9F531B] font-medium'>Portabilidad:</span> Recibir tus datos en formato estructurado</li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">8. Contacto para Privacidad</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            Para ejercer tus derechos o realizar consultas sobre esta política, contáctanos en:<br /><br />
            <span className='text-[#9F531B] font-medium'>Email:</span> drucken2016@hotmail.com<br />
            <span className='text-[#9F531B] font-medium'>Teléfono:</span> +52 33 1587 6207<br />
            <span className='text-[#9F531B] font-medium'>WhatsApp:</span> +52 33 1587 6207<br /><br />
          </p>
        </div>

        {/* Cambios */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">9. Cambios en la Política</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en este sitio web. Te recomendamos revisar esta política periódicamente.
          </p>
        </div>

        {/* Autoridades */}
        <div>
          <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">10. Autoridades Supervisoras</h3>
          <p className="text-[#1A1615]/75 text-sm lg:text-base leading-relaxed">
            Si consideras que tus derechos han sido vulnerados, puedes presentar una denuncia ante el <strong>INAI</strong> (Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales).
          </p>
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
