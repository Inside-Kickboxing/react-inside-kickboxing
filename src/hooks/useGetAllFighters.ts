import { getAllFighters } from "@/api/supabaseDb"
import { useQuery } from "@tanstack/react-query"

const useGetAllFighters = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fighters'],
        queryFn: () => getAllFighters(),
    })
    return { fighters: data,isFightersLoading: isLoading, isFightersError: isError };
}

export default useGetAllFighters;