"use client";

export type THamburgerButtonProps = {
  open: boolean;
  toggleMenu: () => void;
};

/** Tres líneas que se convierten en X al abrir el menú lateral. Solo visible por debajo de lg. */
export const HamburgerButton = ({ open, toggleMenu }: THamburgerButtonProps) => (
  <button
    type="button"
    onClick={toggleMenu}
    aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
    aria-expanded={open}
    className="relative flex lg:hidden items-center justify-center cursor-pointer
      w-7 h-7 text-[#9F531B] hover:text-[#7C3E13]
      transition-colors duration-300"
  >
    <span
      aria-hidden="true"
      className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300
        ${open ? "rotate-45" : "-translate-y-2"}`}
    />

    <span
      aria-hidden="true"
      className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300
        ${open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
    />

    <span
      aria-hidden="true"
      className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300
        ${open ? "-rotate-45" : "translate-y-2"}`}
    />
  </button>
);
