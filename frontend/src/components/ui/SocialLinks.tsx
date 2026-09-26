import { SOCIAL_LINKS } from "@/utils/constants";

export const SocialLinks = () => (
  <div className="flex gap-4">
    {SOCIAL_LINKS.map(({ icon: Icon, url, label }) => (
      <a
        key={label}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Síguenos en ${label} (se abre en una pestaña nueva)`}
          className="w-10 h-10 rounded-full border border-[#9F531B]/25 text-[#9F531B] flex items-center justify-center hover:bg-[#9F531B] hover:text-white transition-all duration-300"
      >
        <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
      </a>
    ))}
  </div>
);
