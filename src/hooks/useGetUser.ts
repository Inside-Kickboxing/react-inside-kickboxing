import { getUserByAuthId } from '@/api/supabaseDb';
import { useQuery } from '@tanstack/react-query';

const useGetUser = (authId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userById', authId],
    queryFn: () => getUserByAuthId(authId),
  });
  return { user: data, isUserLoading: isLoading, isUserError: isError };
};

export default useGetUser;
