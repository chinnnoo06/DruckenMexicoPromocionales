"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Ancho de scroll por breakpoint: 1 tarjeta, o 2 en pantallas grandes
const calculateScrollAmount = () => {
    const width = window.innerWidth;
    if (width < 640) return 160;   // sm
    if (width < 768) return 180;   // md
    if (width < 1024) return 200;  // lg
    if (width < 1280) return 220;  // xl
    return 440;                    // 2xl
};

export const useCarousel = (itemCount: number) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);
    const [scrollAmount, setScrollAmount] = useState(220);

    const checkScrollPosition = useCallback(() => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

            // Mostrar/ocultar botón izquierdo
            setShowLeftButton(scrollLeft > 0);

            // Mostrar/ocultar botón derecho
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
        }
    }, []);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', checkScrollPosition);
            // Verificar posición inicial
            checkScrollPosition();

            return () => {
                carousel.removeEventListener('scroll', checkScrollPosition);
            };
        }
    }, [checkScrollPosition]);

    useEffect(() => {
        const handleResize = () => {
            setScrollAmount(calculateScrollAmount());
            checkScrollPosition();
        };

        window.addEventListener('resize', handleResize);
        setScrollAmount(calculateScrollAmount());

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [checkScrollPosition]);

    // 🔑 Recalcular después de que carguen las imágenes
    useEffect(() => {
        if (itemCount > 0 && carouselRef.current) {
            const imgs = carouselRef.current.querySelectorAll("img");
            let loaded = 0;

            if (imgs.length === 0) {
                // Si no hay imágenes, verificar directamente
                checkScrollPosition();
            } else {
                imgs.forEach((img) => {
                    if (img.complete) {
                        loaded++;
                        if (loaded === imgs.length) {
                            checkScrollPosition();
                        }
                    } else {
                        img.addEventListener("load", () => {
                            loaded++;
                            if (loaded === imgs.length) {
                                checkScrollPosition();
                            }
                        });
                    }
                });
            }
        }
    }, [itemCount, checkScrollPosition]);

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });

            checkScrollPosition();
        }
    };

    return { showLeftButton, showRightButton, carouselRef, scroll };
};
