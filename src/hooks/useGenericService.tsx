import { useQuery } from "@tanstack/react-query"
import { useQueryContext } from "../providers/QueryProvider"
import { api } from "../services/apiServices"
import { log } from "../services/logService"

export const useGenericService = function<T extends Record<string, string>>(endpointKey: keyof T) {
  const { endpoints } = useQueryContext();
  const data = useQuery({
    queryKey: [endpointKey],
    queryFn: async () => {
      try {
        log.info(`Fetching data from endpoint: ${String(endpointKey)}`);
        const response = await api.get(endpoints[endpointKey]);
        log.debug(`Successfully fetched data from ${String(endpointKey)}`);
        return response;
      } catch (error) {
        log.error(`Error fetching data from ${String(endpointKey)}:`, error);
        throw error;
      }
    }
  })

  return data
}
