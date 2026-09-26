import Image from 'next/image';
import Link from 'next/link';
import DruckenLogo from "@/assets/logodrucken.webp";

export const HeaderSimple = () => {
    return (
        <div className="bg-[#f8dcc6] flex justify-center fixed top-0 inset-x-0 z-100 h-20 border-b border-[#9F531B]/20 backdrop-blur-md">
            <header className="max-w-[1600px] mx-auto w-full flex justify-center items-center gap-4 px-4 lg:px-8">
                <div className="logo transition-transform duration-300 hover:scale-105">
                    <Link href="/" className="no-underline">
                        <Image
                            src={DruckenLogo}
                            alt="Logo de Drucken México"
                            width={2512}
                            height={1518}
                            sizes="80px"
                            priority
                            className="h-10 lg:h-12 w-auto object-contain"
                        />
                    </Link>
                </div>
            </header>
        </div>

    )
}
