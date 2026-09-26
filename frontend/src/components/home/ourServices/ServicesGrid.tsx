"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion"
import { services } from '@/utils/constants';
import { slideInBottomInView } from '@/utils/motion';

export const ServicesGrid = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 grid-flow-dense auto-rows-70 sm:auto-rows-87.5 gap-4">
      {services.map((service) => {
        const rotating = service.images;
        const image = rotating ? rotating[tick % rotating.length] : service.image;

        return (
          <motion.div key={service.id} {...slideInBottomInView}
            className={`group relative overflow-hidden rounded-lg border border-[#9F531B]/25 shadow-md hover:shadow-xl transition-shadow duration-300 ${service.className}`}
          >
            <Image
              src={image}
              alt={service.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover saturate-[0.95] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
            />

            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#1A1615]/70 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

            <h3 className="absolute left-5 bottom-4 z-10 font-medium text-lg lg:text-xl text-[#FFF9F5] drop-shadow transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
              {service.name}
            </h3>

            <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 bg-linear-to-t from-[#1A1615]/95 via-[#1A1615]/55 to-transparent to-75% opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <h3 className="mt-1.5 font-medium text-lg lg:text-2xl text-[#FFF9F5]">
                {service.name}
              </h3>
              <p className="mt-1.5 text-xs lg:text-sm leading-relaxed text-[#FFF9F5]/85 line-clamp-4">
                {service.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
