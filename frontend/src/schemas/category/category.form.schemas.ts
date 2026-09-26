import { z } from "zod"

/**
 * El endpoint de producto valida la categoría con isAlpha('es-ES', { ignore: ' -_' }), así que
 * una categoría con números o símbolos no se le podría asignar a ningún producto. Se rechaza aquí.
 */
const CATEGORY_NAME_REGEX = /^[A-Za-zÁÉÍÑÓÚÜáéíñóúü \-_]+$/

export const CategoryFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Campo obligatorio" })
        .regex(CATEGORY_NAME_REGEX, { message: 'Solo se permiten letras, espacios y guiones' })
})

export type TCategoryForm = z.infer<typeof CategoryFormSchema>
