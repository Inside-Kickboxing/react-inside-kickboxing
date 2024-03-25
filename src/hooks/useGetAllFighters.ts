import { getAllFighters } from "@/api/supabaseDb"
import { useQuery } from "@tanstack/react-query"

/* Eksempel på hvordan man skrur av refetching av data 
*  Hvis shouldFetch = false så settes staleTime til Infinity
*  og vi skrur av mulighet til å kjøre nytt query. Da brukes kun cached data. 
*/

const useGetAllFighters = (shouldFetch?: boolean) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fighters'],
        queryFn: () => getAllFighters(),
        staleTime: shouldFetch ? 0 : Infinity,
        enabled: shouldFetch !== undefined ? shouldFetch: undefined, // Setter enabled: true / false KUN dersom vi sender inn shouldFetch
    })
    return { fighters: data, isFightersLoading: isLoading, isFightersError: isError };
}

export default useGetAllFighters;