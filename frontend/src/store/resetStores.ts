import { useCatalogOriginStore } from "./catalogOriginStore"

export const resetAllStores = () => {
  useCatalogOriginStore.getState().clearOrigin()
}
