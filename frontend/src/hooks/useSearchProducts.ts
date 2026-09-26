"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { searchProductsService, TSearchProductsParams } from "@/services/client/product.service"

export const useSearchProducts = ({ category, query, page }: TSearchProductsParams) => {
  return useQuery({
    queryKey: ["products", "search", category, query, page],
    queryFn: () => searchProductsService({ category, query, page }),
    enabled: query.trim() !== "",
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: false
  })
}
