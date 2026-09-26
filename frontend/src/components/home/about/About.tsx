"use client"

import { slideInBottomInView } from '@/utils/motion'
import { ContentAbout } from './ContentAbout'
import { motion } from "framer-motion"

export const About = () => {
    return (
        <div className='max-w-[1600px] mx-auto px-4 lg:px-8'>
            <motion.div {...slideInBottomInView} className="mb-8">
                <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
                    Nosotros
                </span>
                <h2 className='mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]'>
                    Sobre nosotros
                </h2>
                <p className="mt-4 text-[#1A1615]/75 text-base lg:text-lg leading-relaxed">
                    Drucken es una empresa mexicana dedicada a la distribución de artículos promocionales, desde el año 2016 contamos
                    con un equipo de trabajo preparado, comprometido y responsable, que busca brindarle el mejor servicio
                    y las mejores alternativas de marketing promocional.
                </p>
            </motion.div>

            <ContentAbout />
        </div>
    )
}
