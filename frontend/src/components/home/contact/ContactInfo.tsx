import { motion } from "framer-motion"
import { SocialLinks } from "@/components/ui/SocialLinks";
import { slideInBottomInView } from "@/utils/motion";
import { contactDetails } from "@/utils/constants";

export const ContactInfo = () => {

    return (
        <motion.div {...slideInBottomInView} className='w-full md:w-1/2 flex flex-col pb-8 md:pr-8 md:pb-0'>
            <div className='divide-y divide-[#9F531B]/25'>
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className='flex items-center gap-4 py-6'>
                        <Icon className="h-4 w-4 lg:h-5 lg:w-5 text-[#9F531B] mt-1" aria-hidden="true" />
                        <div className='flex-1'>
                            <p className='text-[10px] lg:text-xs font-semibold tracking-[0.18em] uppercase text-[#1A1615]/75 mb-1'>
                                {label}
                            </p>
                            {href ? (
                                <a href={href} className='text-[#1A1615]/75 font-medium text-sm lg:text-base hover:text-[#9F531B] transition-colors duration-300 wrap-break-word'>
                                    {value}
                                </a>
                            ) : (
                                <p className='text-[#1A1615]/75 font-medium text-sm lg:text-base'>{value}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className='py-6 border-y border-[#9F531B]/25'>
                <p className='text-[10px] lg:text-xs font-semibold tracking-[0.18em] uppercase text-[#1A1615]/75 mb-3'>
                    Horarios de atención
                </p>
                <div className='space-y-2 max-w-xs'>
                    <div className='flex justify-between items-center text-sm lg:text-base'>
                        <span className='text-[#1A1615]/75'>Lunes – Viernes</span>
                        <span className='text-[#1A1615]/75 font-medium'>10:00 – 18:00</span>
                    </div>
                    <div className='flex justify-between items-center text-sm lg:text-base'>
                        <span className='text-[#1A1615]/75'>Sábado</span>
                        <span className='text-gray-400'>Cerrado</span>
                    </div>
                    <div className='flex justify-between items-center text-sm lg:text-base'>
                        <span className='text-[#1A1615]/75'>Domingo</span>
                        <span className='text-gray-400'>Cerrado</span>
                    </div>
                </div>
            </div>

            {/* Redes sociales */}
            <div className='pt-6'>
                <p className='text-[10px] lg:text-xs font-semibold tracking-[0.18em] uppercase text-[#1A1615]/75 mb-3'>
                    Síguenos
                </p>
                <SocialLinks />
            </div>
        </motion.div>
    )
}