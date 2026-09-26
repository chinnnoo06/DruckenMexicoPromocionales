"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { FaChevronDown } from "react-icons/fa6"

import { useGetCategories } from "@/hooks/useGetCategories"
import { slugify } from "@/utils/format"
import { input } from "@/utils/styles/form"

export type TCategoryDropdownProps = {
  /** Slug de la categoría activa, tal cual viene de la URL. */
  currentCategory: string
  isAdmin?: boolean
}

const truncateLabel = (label: string, maxLength = 15) =>
  label.length > maxLength ? `${label.slice(0, maxLength)}...` : label

export const CategoryDropdown = ({ currentCategory, isAdmin = false }: TCategoryDropdownProps) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { data: categories } = useGetCategories()

  const options = [
    { value: "todos", label: "Todos" },
    ...(categories ?? []).map((category) => ({
      value: slugify(category.name),
      label: category.name
    }))
  ]

  // Mientras carga la lista, muestra el slug de la URL en vez de quedarse vacío
  const selected = options.find((option) => option.value === currentCategory)
  const selectedLabel = selected?.label ?? currentCategory

  const selectCategory = (value: string) => {
    const base = isAdmin ? "/admin/catalogo" : "/catalogo"

    router.push(`${base}/${value}/1`)
    setOpen(false)
  }

  // Cierra al hacer clic fuera o con Escape
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={`Filtrar por categoría, actual: ${selectedLabel}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${input} flex gap-2 items-center justify-between cursor-pointer`}
      >
        <span>{truncateLabel(selectedLabel)}</span>
        <FaChevronDown
          className={`h-3 w-3 text-[#9F531B] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-20 mt-2 w-full bg-white border border-[#9F531B]/30 rounded-lg shadow-lg overflow-hidden max-h-72 overflow-y-auto"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={currentCategory === option.value}
              onClick={() => selectCategory(option.value)}
              className={`block w-full text-left px-4 py-2 text-xs lg:text-sm cursor-pointer transition-colors duration-200
                ${currentCategory === option.value
                  ? "bg-[#FFD8A8] text-[#9F531B] font-semibold"
                  : "text-[#1A1615]/75 hover:bg-[#FBE8D3] hover:text-[#9F531B]"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
