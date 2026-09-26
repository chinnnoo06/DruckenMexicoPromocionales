"use client"

import { useState } from "react"

import { useDebounce } from "@/hooks/useDebounce"
import { useSearchProducts } from "@/hooks/useSearchProducts"
import { TProduct } from "@/schemas/product/product.schemas"
import { LoadingSpinner } from "../ui/LoadingSpinner"
import { CatalogFilters } from "./CatalogFilters"
import { MapCatalog } from "./MapCatalog"
import { PaginationButtons } from "./PaginationButtons"
import { ScrollToProduct } from "./ScrollToProduct"

export type TCatalogViewProps = {
  category: string
  products: TProduct[]
  totalPages: number
  currentPage: number
  isAdmin?: boolean
}

export const CatalogView = ({ category, products, totalPages, currentPage, isAdmin = false}: TCatalogViewProps) => {
  const [search, setSearch] = useState("")
  const [searchPage, setSearchPage] = useState(1)

  const debouncedSearch = useDebounce(search)
  const isSearching = debouncedSearch.trim() !== ""

  const { data, isFetching } = useSearchProducts({
    category,
    query: debouncedSearch,
    page: searchPage,
  })

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setSearchPage(1) 
  }

  const isLoadingSearch = isSearching && isFetching && !data

  return (
    <>
      <ScrollToProduct />

      <CatalogFilters
        currentCategory={category}
        isAdmin={isAdmin}
        search={search}
        onSearchChange={handleSearchChange}
      />

      {isLoadingSearch ? (
        <LoadingSpinner />
      ) : (
        <MapCatalog
          products={isSearching ? data?.products ?? [] : products}
          category={category}
          currentPage={isSearching ? searchPage : currentPage}
          isAdmin={isAdmin}
        />
      )}

      {isSearching ? (
        <PaginationButtons
          totalPages={data?.pages ?? 1}
          currentPage={searchPage}
          onPageChange={setSearchPage}
        />
      ) : (
        <PaginationButtons
          totalPages={totalPages}
          currentPage={currentPage}
          category={category}
          isAdmin={isAdmin}
        />
      )}
    </>
  )
}
