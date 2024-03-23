import { getFightsByEventId } from "@/api/supabaseDb"
import { useQuery } from "@tanstack/react-query"

const useGetFightsByEvent = (id: number) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['eventFight', id],
        queryFn: () => getFightsByEventId(id),
    })
    return { eventFights: data, isEventFightsLoading: isLoading, isEventFightsError: isError };
}

export default useGetFightsByEvent;