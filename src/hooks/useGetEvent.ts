import { getEventById } from "@/api/supabaseDb"
import { useQuery } from "@tanstack/react-query"

const useGetEvent = (id: number) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['eventById', id],
        queryFn: () => getEventById(id),
    })
    return { event: data, isEventLoading: isLoading, isEventError: isError };
}

export default useGetEvent;