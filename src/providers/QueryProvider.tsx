import React from "react";

/**
 * Hook que fornece endpoints de consulta para componentes filhos
 * 
 * @param endpoints - Objeto com endpoints de consulta
 * @returns Objeto contendo os endpoints configurados
 */
const useQueryProviderBase = function<T extends Record<string, string>>(endpoints: T) {
  return {
    endpoints,
  }
}

/**
 * Tipo de retorno do hook useQueryProviderBase
 */
export type useQueryProviderType = ReturnType<typeof useQueryProviderBase>

const QueryContext = React.createContext<useQueryProviderType>({
  endpoints: {},
})

/**
 * Props do componente QueryProvider
 */
export interface QueryProviderProps {
  /**
   * Objeto com endpoints de consulta que serão disponibilizados para os componentes filhos
   */
  endpoints: Record<string, string>
}

/**
 * Componente Provider que disponibiliza endpoints de consulta para componentes filhos
 * 
 * @param props - Props do componente contendo endpoints e children
 * @returns Componente React que fornece endpoints de consulta através de contexto
 */
export const QueryProvider = function({ endpoints, children }: React.PropsWithChildren<QueryProviderProps>) {
  const value = useQueryProviderBase(endpoints)
  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  )
}

export const useQueryContext = () => {
  return React.useContext(QueryContext)
}