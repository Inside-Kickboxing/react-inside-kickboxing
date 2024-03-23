import { getFighterById } from "@/api/supabaseDb"
import { useQuery } from "@tanstack/react-query"

const useGetFighter = (id: number) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fighter', id],
        queryFn: () => getFighterById(id),
    })
    return { fighter: data, isFighterLoading: isLoading, isFighterError: isError };
}

export default useGetFighter;