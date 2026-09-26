import { z } from "zod"

export const ContactFormSchema = z.object({
    name: z.string().min(1, { message: 'Campo obligatorio' }),
    subject: z.string().min(1, { message: 'Campo obligatorio' }),
    details: z.string().min(1, { message: 'Campo obligatorio' })
})

export type TContactForm = z.infer<typeof ContactFormSchema>