"use client"

import { useEffect, useState } from "react"

/** Retrasa el valor para no disparar una petición por cada tecla. */
export const useDebounce = <T,>(value: T, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
