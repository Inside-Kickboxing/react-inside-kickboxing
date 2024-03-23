import { getFightersByFightId } from "@/api/supabaseDb"
import { useQuery } from "@tanstack/react-query"

const useGetFightersByFight = (id: number) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fightersByFightId', id],
        queryFn: () => getFightersByFightId(id),
    })
    return { fighters: data, isFightersLoading: isLoading, isFightersError: isError };
}

export default useGetFightersByFight;
