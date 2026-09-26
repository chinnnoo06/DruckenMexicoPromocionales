import type { TSectionId } from "@/hooks/useHeaderFooter";

export type TNavItem =
  | { kind: "link"; text: string; to: string }
  | { kind: "section"; text: string; sectionId: TSectionId }
  /** No navega: dispara la action de cierre de sesión. */
  | { kind: "logout"; text: string };

export const HOME_NAV_ITEMS: TNavItem[] = [
  { kind: "section", sectionId: "inicio", text: "Inicio" },
  { kind: "section", sectionId: "nosotros", text: "Nosotros" },
  { kind: "section", sectionId: "servicios", text: "Servicios" },
  { kind: "section", sectionId: "contacto", text: "Contacto" },
  { kind: "link", to: "/catalogo/todos/1", text: "Catálogo" },
  { kind: "link", to: "/pedido", text: "Pedido" },
];

export const AWAY_NAV_ITEMS: TNavItem[] = [
  { kind: "link", to: "/", text: "Inicio" },
  { kind: "section", sectionId: "nosotros", text: "Nosotros" },
  { kind: "section", sectionId: "servicios", text: "Servicios" },
  { kind: "section", sectionId: "contacto", text: "Contacto" },
  { kind: "link", to: "/catalogo/todos/1", text: "Catálogo" },
  { kind: "link", to: "/pedido", text: "Pedido" },
];

export const ADMIN_NAV_ITEMS: TNavItem[] = [
  { kind: "link", to: "/admin/catalogo/todos/1", text: "Catálogo" },
  { kind: "link", to: "/admin/producto/agregar", text: "Agregar Producto" },
  { kind: "link", to: "/admin/categorias", text: "Administrar Categorías" },
  { kind: "logout", text: "Cerrar Sesión" },
];

export const getNavItems = (isAdmin: boolean, isInicio: boolean): TNavItem[] => {
  if (isAdmin) return ADMIN_NAV_ITEMS;

  return isInicio ? HOME_NAV_ITEMS : AWAY_NAV_ITEMS;
};

export const isLinkActive = (pathname: string, to: string) =>
  pathname === to || pathname.startsWith(`${to}/`);
