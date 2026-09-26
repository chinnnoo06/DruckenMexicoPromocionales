import React from 'react'
import { motion } from "framer-motion"
import { FaEye, FaBullseye } from 'react-icons/fa6';
import { slideInBottomInView } from '@/utils/motion';

export const ContentAbout = () => {
    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-stretch gap-12 md:gap-8'>

                <motion.div {...slideInBottomInView} className='flex-1 bg-linear-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/25 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl'>
                    <div className='p-8 flex flex-col items-center'>
                        <div className='mb-6 p-4 bg-[#eddcca] rounded-full'>
                            <FaEye className="h-9 w-9 lg:h-10 lg:w-10 text-[#9F531B]" aria-hidden="true" />
                        </div>
                        <h3 className='text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4'>Visión</h3>
                        <p className='text-[#1A1615]/75 text-center text-sm lg:text-base leading-relaxed'>
                            Somos un equipo que marcamos tendencias en el mercado promocional, a través de la selección, mejora, diferenciación,
                            importación y comercialización de artículos promocionales de alto valor percibido, precios competitivos, excelente
                            calidad y diseños innovadores que satisfacen los requerimientos de nuestros clientes.
                        </p>
                    </div>
                </motion.div>

                <motion.div {...slideInBottomInView} className='flex-1 bg-linear-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/25 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl'>
                    <div className='p-8 flex flex-col items-center'>
                        <div className='mb-6 p-4 bg-[#eddcca] rounded-full'>
                            <FaBullseye className="h-9 w-9 lg:h-10 lg:w-10 text-[#9F531B]" aria-hidden="true" />
                        </div>
                        <h3 className='text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4'>Misión</h3>
                        <p className='text-[#1A1615]/75 text-center text-sm lg:text-base leading-relaxed'>
                            Ser la primera opción de compra de artículos promocionales para nuestros clientes, gracias a la confianza que
                            tienen en nuestra calidad.
                        </p>
                    </div>
                </motion.div>

            </div>

            <motion.div {...slideInBottomInView} className="mt-8">
                <h3 className="text-xl lg:text-2xl font-semibold text-[#9F531B] mb-4">Nuestro Compromiso</h3>
                <p className="text-[#1A1615]/75 text-base lg:text-lg block">
                    En cada producto que ofrecemos, buscamos superar las expectativas de nuestros clientes con innovación, calidad y servicio excepcional.
                </p>
            </motion.div>
        </>
    )
}