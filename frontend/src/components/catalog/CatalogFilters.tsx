"use client"

import { FaMagnifyingGlass } from "react-icons/fa6"

import { input } from "@/utils/styles/form"
import { CategoryDropdown } from "./CategoryDropdown"

export type TCatalogFiltersProps = {
  currentCategory: string
  isAdmin?: boolean
  search: string
  onSearchChange: (value: string) => void
}

export const CatalogFilters = ({ currentCategory, isAdmin = false, search, onSearchChange }: TCatalogFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row w-full gap-2 mb-8">
      <div className="relative grow">
        <span className="absolute top-1/2 left-4 -translate-y-1/2 text-[#1A1615]/75">
          <FaMagnifyingGlass className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        </span>
        <input
          type="text"
          name="query"
          placeholder="Buscar por nombre o clave..."
          aria-label="Buscar productos por nombre o clave"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className={`${input} pl-10!`}
        />
      </div>

      <CategoryDropdown currentCategory={currentCategory} isAdmin={isAdmin} />
    </div>
  )
}
