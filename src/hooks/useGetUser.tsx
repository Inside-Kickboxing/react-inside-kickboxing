import { getUserById } from '@/api/supabaseDb';
import { useQuery } from '@tanstack/react-query';

const useGetUser = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userById', id],
    queryFn: () => getUserById(Number(id)),
  });
  return { user: data, isUserLoading: isLoading, isUserError: isError };
};

export default useGetUser;
