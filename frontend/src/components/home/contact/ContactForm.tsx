import { motion } from "framer-motion"
import { FaCircleExclamation, FaWhatsapp } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { ContactFormSchema, TContactForm } from '@/schemas/contact/contact.form.schemas';
import { slideInBottomInView } from '@/utils/motion';
import { errorSpan, input, label } from '@/utils/styles/form';
import { primaryButton } from '@/utils/styles/button';
import { WHATSAPP_NUMBER } from '@/utils/constants';

export const ContactForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(ContactFormSchema)
    })

    const handleSendMessage = (data: TContactForm) => {
        const subject = `*${data.subject}*`
        const greeting = `Hola buen día, soy ${data.name}, visité el sitio web de Drucken México Promocionales.`
        const details = data.details

        const encodedMessage = encodeURIComponent(`${subject}\n\n${greeting}\n\n${details}`);

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

        window.open(whatsappUrl, "_blank")

        reset()
    }

    return (
        <motion.div {...slideInBottomInView} className='w-full md:w-1/2'>
            <form className='space-y-8' onSubmit={handleSubmit(handleSendMessage)} noValidate>
                <div className="form-group">
                    <label htmlFor="name" className={label}>Nombre Completo </label>
                    <input type="text" id="name" autoComplete="name" {...register("name")} placeholder="Escribe tu nombre" className={input} />

                    {errors.name &&
                        <span className={errorSpan}>
                            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                            {errors.name.message}
                        </span>
                    }
                </div>

                <div className="form-group">
                    <label htmlFor="subject" className={label}>Asuno del Mensaje </label>
                    <input type="text" id="subject" autoComplete="off" {...register("subject")} placeholder="¿En qué podemos ayudarte?" className={input} />
                    {errors.subject &&
                        <span className={errorSpan}>
                            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                            {errors.subject.message}
                        </span>
                    }
                </div>

                <div className="form-group">
                    <label htmlFor="details" className={label}>Mensaje Detallado </label>
                    <textarea id="details" rows={4} autoComplete="off" {...register("details")} placeholder="Cuéntanos sobre tu proyecto..." className={`${input} resize-none`} />
                    {errors.details &&
                        <span className={errorSpan}>
                            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                            {errors.details.message}
                        </span>
                    }
                </div>

                <div className="space-y-2.5">
                    <button className={`${primaryButton} flex w-full items-center justify-center gap-2.5`}>
                        <FaWhatsapp className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                        Enviar por WhatsApp
                    </button>

                    <p className="text-xs lg:text-sm text-center text-[#1A1615]/75">
                        Se abrirá WhatsApp con tu mensaje listo para enviar.
                    </p>
                </div>
            </form>
        </motion.div>
    )
}