/** Convierte "Gorras y Sombreros" en "gorras-y-sombreros" para usarlo en la URL. */
export const slugify = (text: string) =>
  text
    .normalize("NFD") // separa letras de sus acentos
    .replace(/[̀-ͯ]/g, "") // elimina los acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // espacios → guiones
    .replace(/[^a-z0-9-]/g, "") // quita cualquier caracter que no sea válido
    .replace(/-+/g, "-") // colapsa guiones múltiples
    .replace(/^-+|-+$/g, ""); // quita guiones al inicio/final
