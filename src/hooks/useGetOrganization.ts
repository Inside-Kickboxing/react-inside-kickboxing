import { getOrganizationById } from '@/api/supabaseDb';
import { useQuery } from '@tanstack/react-query';

const useGetOrganization = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['fighter', id],
    queryFn: () => getOrganizationById(id),
  });
  return { organization: data, isOrganizationLoading: isLoading, isOrganizationError: isError };
};

export default useGetOrganization;
