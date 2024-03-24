import { getUserByAuthId } from '@/api/supabaseDb';
import { useQuery } from '@tanstack/react-query';

const useGetUserByAuthUser = (authId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userByAuthId', authId],
    queryFn: () => getUserByAuthId(authId),
  });
  return { user: data, isUserLoading: isLoading, isUserError: isError };
};

export default useGetUserByAuthUser;
