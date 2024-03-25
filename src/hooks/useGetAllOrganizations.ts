import { getAllOrganizations } from '@/api/supabaseDb';
import { useQuery } from '@tanstack/react-query';

const useGetAllOrganizations = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['fighters'],
    queryFn: () => getAllOrganizations(),
  });
  return { organizations: data, isOrganizationsLoading: isLoading, isOrganizationsError: isError };
};

export default useGetAllOrganizations;
