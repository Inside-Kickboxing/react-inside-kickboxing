import { getUserListsByUserId } from '@/api/supabaseDb';
import { useQuery } from '@tanstack/react-query';

const useGetUserListsByUser = (userId: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userListsByUser', userId],
    queryFn: () => getUserListsByUserId(userId),
  });
  return { userList: data, isUserListsLoading: isLoading, isUserListsError: isError };
};

export default useGetUserListsByUser;
