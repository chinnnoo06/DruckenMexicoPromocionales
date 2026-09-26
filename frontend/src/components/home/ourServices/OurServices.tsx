"use client"

import { slideInBottomInView } from '@/utils/motion';
import { ServicesGrid } from './ServicesGrid';
import { motion } from "framer-motion"

export const OurServices = () => {

  return (
    <div className='max-w-[1600px] mx-auto px-4 lg:px-8'>
      <motion.div {...slideInBottomInView} className="mb-8">
        <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
          Servicios
        </span>
        <h2 className='mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]'>
          Nuestros Servicios
        </h2>
        <p className="mt-4 text-[#1A1615]/75 text-base lg:text-lg leading-relaxed">
          Ofrecemos una amplia variedad en acabados, grabados y tipos de impresión para los artículos promocionales,
          de acuerdo a las necesidades requeridas.
        </p>
      </motion.div>

      <ServicesGrid />
    </div>
  );
}
