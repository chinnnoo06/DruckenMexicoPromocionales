import { z } from "zod"

const CATEGORY_NAME_REGEX = /^[A-Za-zÁÉÍÑÓÚÜáéíñóúü \-_]+$/

export const CategoryFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Campo obligatorio" })
        .regex(CATEGORY_NAME_REGEX, { message: 'Solo se permiten letras, espacios y guiones' })
})

export type TCategoryForm = z.infer<typeof CategoryFormSchema>
