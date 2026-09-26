import { catalogs } from '@/utils/constants';
import { FaSquareUpRight } from 'react-icons/fa6';

export const CatalogsLinks = () => {
    return (
        <div className='flex flex-wrap items-center gap-2 sm:gap-3 mt-6 px-2'>
            {catalogs.map((catalog, index) => (
                <a
                    key={index}
                    href={catalog.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                            group flex items-center gap-2 sm:gap-3
                            bg-white border-2 border-[#9F531B] 
                            rounded-lg sm:rounded-xl px-2 py-1 sm:px-3 
                            transition-all duration-300 
                            hover:shadow-md
                            min-w-32.5 sm:min-w-35 flex-1 max-w-40 sm:max-w-45
                            hover:scale-105 transform-gpu
                            hover:border-[#D9773B] hover:bg-linear-to-r hover:from-[#FBE8D3] hover:to-[#FFD8A8]
                            `}
                >
                    <div className={`text-lg lg:text-xl transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                        {catalog.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-[#9F531B] text-xs lg:text-sm leading-tight truncate`}>
                            {catalog.title}
                        </h3>
                    </div>

                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#9F531B] flex items-center justify-center text-white text-xs transform transition-transform duration-300 group-hover:translate-x-0.5 shrink-0`}>
                        <FaSquareUpRight className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
                    </div>
                </a>
            ))}
        </div>
    )
}
