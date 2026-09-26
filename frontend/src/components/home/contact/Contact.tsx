"use client"

import { slideInBottomInView } from '@/utils/motion';
import { motion } from "framer-motion"
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';

export const Contact = () => {

  return (
    <div className='max-w-[1600px] mx-auto px-4 lg:px-8'>
      <motion.div {...slideInBottomInView}className="mb-8">
        <span className="text-[11px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#7C3E13]">
          Contacto
        </span>
        <h2 className='mt-2 font-semibold text-4xl lg:text-5xl tracking-tight text-[#9F531B]'>
          Hablemos de tu proyecto
        </h2>
        <p className="mt-4 text-[#1A1615]/75 text-base lg:text-lg leading-relaxed">
          Estamos listos para escuchar tus ideas y hacerlas realidad.
        </p>
      </motion.div>

      <div className='flex flex-col md:flex-row gap-8 items-center w-full divide-y md:divide-x md:divide-y-0 divide-[#9F531B]/25'>
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}