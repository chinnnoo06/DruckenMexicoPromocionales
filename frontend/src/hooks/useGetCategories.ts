"use client"

import { useQuery } from "@tanstack/react-query"
import { getCategoriesService } from "@/services/client/category.service"

/** Se exporta para que el CRUD del admin invalide con la misma key. */
export const CATEGORIES_QUERY_KEY = ["categories"]

export const useGetCategories = () => {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: getCategoriesService,
    staleTime: 1000 * 60 * 60 * 12, // 12h (cambian muy poco)
    gcTime: 1000 * 60 * 60 * 24, // el gc nunca debe ser menor al stale o el caché se descarta antes de vencer
    retry: false
  })
}
