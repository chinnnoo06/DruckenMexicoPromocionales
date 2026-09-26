import { z } from "zod"

/** Mismo criterio que el proyecto anterior: solo letras y espacios, con acentos y ñ. */
const COLOR_NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

/**
 * Lo mismo que valida isHexColor() en el backend: 3, 4, 6 u 8 dígitos.
 * Ahí el # es opcional, aquí no, porque el valor se usa tal cual como color CSS.
 */
const HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/

export const ProductColorFormSchema = z.object({
    color: z
        .string()
        .trim()
        .min(1, { message: "Campo obligatorio" })
        .regex(COLOR_NAME_REGEX, { message: 'El nombre del color solo puede contener letras' }),
    hex: z
        .string()
        .trim()
        .min(1, { message: "Campo obligatorio" })
        .regex(HEX_REGEX, { message: 'Color hex inválido, por ejemplo #FFFFFF' }),
    image: z.instanceof(File, { message: "Campo obligatorio" }),
})

export const ProductFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Campo obligatorio" }),
    key: z.string().trim().min(1, { message: "Campo obligatorio" }),
    description: z.string().trim().min(1, { message: "Campo obligatorio" }),
    printingTechnique: z.string().trim().min(1, { message: "Campo obligatorio" }),
    category: z.string().trim().min(1, { message: "Campo obligatorio" }),
    material: z.string().trim().min(1, { message: "Campo obligatorio" }),
    measures: z.string().trim().min(1, { message: "Campo obligatorio" }),
    printingMeasures: z.string().trim().min(1, { message: "Campo obligatorio" }),
    minQuantity: z
        .number({ error: "Campo obligatorio" })
        .int({ message: 'Debe ser un número entero' })
        .min(1, { message: 'Debe ser al menos 1' }),
    colors: z.array(ProductColorFormSchema).min(1),
    generalImage: z.instanceof(File).optional(),
})
    // Con un solo color la imagen del color ya sirve de portada; con varios hace falta una general
    .superRefine((data, ctx) => {
        if (data.colors.length > 1 && !data.generalImage) {
            ctx.addIssue({ code: 'custom', path: ['generalImage'], message: "Campo obligatorio" })
        }
    })

export type TProductForm = z.infer<typeof ProductFormSchema>
