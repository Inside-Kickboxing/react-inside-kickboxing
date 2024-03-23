import { getAllEvents } from "@/api/supabaseDb"
import { useQuery } from "@tanstack/react-query"

const useGetAllEvents = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['events'],
        queryFn: () => getAllEvents(),
    })
    return { events: data, isEventsLoading: isLoading, isEventsError: isError };
}

export default useGetAllEvents;