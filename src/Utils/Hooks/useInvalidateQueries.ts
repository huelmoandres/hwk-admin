import { useQueryClient } from "@tanstack/react-query"

/**
 * Hook personalizado para invalidar queries que contengan stringToInvalidate en su clave
 */
export const useInvalidateQueries = () => {
  const queryClient = useQueryClient()

  const invalidateQueriesByString = (stringToInvalidate: string) => {
    queryClient.invalidateQueries({
      predicate: (query) => {

        if (Array.isArray(query.queryKey)) {
          return query.queryKey.some((key) => {
            const keyValue = key as unknown
            return typeof keyValue === "string" && keyValue.includes(stringToInvalidate)
          })
        }

        const queryKey = query.queryKey as unknown
        if (typeof queryKey === "string") {
          return queryKey.includes(stringToInvalidate)
        }

        return false
      },
      refetchType: 'all'
    })
  }

  return { invalidateQueriesByString }
}