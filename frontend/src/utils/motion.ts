import type { MotionProps, Variants } from "framer-motion"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const slideInBottom: MotionProps = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT },
}

export const slideInBottomInView: MotionProps = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE_OUT },
}

export const slideInBottomScaleInView: MotionProps = {
  initial: { opacity: 0, y: 30, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE_OUT },
}

export const slideInLeftInView: MotionProps = {
  initial: { opacity: 0, x: -70 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE_OUT },
}

export const slideInRightInView: MotionProps = {
  initial: { opacity: 0, x: 70 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE_OUT },
}

export const scaleInView: MotionProps = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE_OUT },
}

/* ---------- Stagger: contenedor + item (con variants) ----------
   Uso: <motion.div {...staggerContainer}> con hijos <motion.x variants={staggerItem} /> */

export const staggerContainer: MotionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  },
}

export const staggerContainerOnLoad: MotionProps = {
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
}

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE_OUT } },
}

/* ---------- Gestos (hover) ---------- */

export const hoverLift: MotionProps = {
  whileHover: { y: -6 },
  transition: { duration: 0.3, ease: "easeOut" },
}

export const widgetExpandMotion: MotionProps = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "60vh", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
}