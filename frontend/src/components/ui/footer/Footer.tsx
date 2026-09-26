import Image from "next/image";
import Link from "next/link";
import { FaShieldHalved } from "react-icons/fa6";

import DruckenLogo from "@/assets/logodrucken.webp";
import { contactDetails, services } from "@/utils/constants";
import { SocialLinks } from "../SocialLinks";
import { FooterNav } from "./FooterNav";

const LEGAL_LINKS = [
  { to: "/terminos", text: "Términos y Condiciones" },
  { to: "/privacidad", text: "Política de Privacidad" },
];

export type TFooterProps = {
  isAdmin?: boolean;
};

export const Footer = ({ isAdmin = false }: TFooterProps) => (
  <div className="footer-container bg-[#f8dcc6] border-t border-[#9F531B]/20">
    <footer className="max-w-[1600px] mx-auto py-12 px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Logo e información de la empresa */}
        <div className="flex flex-col items-center lg:items-start gap-4" translate="no">
          <Link
            href="/"
            className="no-underline hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={DruckenLogo}
              alt="Logo de Drucken México"
              width={2512}
              height={1518}
              sizes="160px"
              className="h-14 lg:h-20 w-auto object-contain"
            />
          </Link>
          <p className="text-[#1A1615] text-sm lg:text-base leading-relaxed text-center lg:text-left">
            Empresa mexicana dedicada a la distribución de artículos promocionales
            desde 2016. Calidad, innovación y servicio al cliente.
          </p>
        </div>

        {/* Navegación */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <h3 className="text-[#9F531B] font-semibold uppercase text-lg border-b-2 border-[#9F531B] pb-2">Navegación</h3>
          <FooterNav isAdmin={isAdmin} />
        </div>

        {/* Servicios */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <h3 className="text-[#9F531B] font-semibold uppercase text-lg border-b-2 border-[#9F531B] pb-2">Nuestros Servicios</h3>
          <ul className="flex flex-col gap-2 text-center md:text-left">
            {services.map(({ id, name }) => (
              <li
                key={id}
                className="text-[#1A1615] text-sm lg:text-base hover:text-[#9F531B] transition-colors duration-300"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto y redes sociales */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <h3 className="text-[#9F531B] font-semibold uppercase text-lg border-b-2 border-[#9F531B] pb-2">Conócenos</h3>

          <SocialLinks />

          <div className="w-full flex flex-col gap-2 text-sm lg:text-base text-[#1A1615] text-center md:text-left">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-2 justify-center md:justify-start"
              >
                <Icon
                  className="h-4 w-4 lg:h-5 lg:w-5 shrink-0 text-[#9F531B]"
                  aria-hidden="true"
                />
                {href ? (
                  <a
                    href={href}
                    className="hover:text-[#9F531B] transition-colors duration-300 wrap-break-word"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="wrap-break-word">{value}</span>
                )}
              </div>
            ))}

            <div className="w-full h-50">
              <iframe
                title="Mapa de ubicación de Drucken México"
                src="https://www.google.com/maps/embed?pb=!4v1758817539392!6m8!1m7!1s6MUCFHMBMFJ0acuw4n5Dfw!2m2!1d20.72459020010015!2d-103.3990178222977!3f24.92747185429691!4f-13.11299517827375!5f0.8173988424383203"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="origin"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección inferior */}
      <div className="border-t border-[#9F531B]/20 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#1A1615] text-xs lg:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Drucken México Promocionales. Todos los
            derechos reservados.
          </p>

          <div className="flex flex-wrap justify-center gap-2 text-xs lg:text-sm">
            {LEGAL_LINKS.map(({ to, text }) => (
              <Link
                key={to}
                href={to}
                className="text-[#1A1615] hover:text-[#9F531B] transition-colors duration-300"
              >
                {text}
              </Link>
            ))}
          </div>

          <p className="text-[#1A1615] text-xs lg:text-sm text-center md:text-right">
            <FaShieldHalved
              className="inline-block h-4 w-4 lg:h-5 lg:w-5 text-[#9F531B] mr-1"
              aria-hidden="true"
            />
            Sitio web seguro
          </p>
        </div>
      </div>
    </footer>
  </div>
);
