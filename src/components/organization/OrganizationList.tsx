import useGetAllOrganizations from '@/hooks/useGetAllOrganizations';
import { useNavigate } from 'react-router-dom';

const OrganizationList = () => {
  const navigate = useNavigate();
  const { organizations, isOrganizationsLoading, isOrganizationsError } = useGetAllOrganizations();

  if (isOrganizationsLoading) {
    return <div>Loading...</div>;
  }

  if (isOrganizationsError) {
    return <div>Error fetching data</div>;
  }
  
  return (
    <div>
      <h2 className="flex justify-center text-xl">Organizations</h2>
      <ul>
        {organizations &&
          organizations.map((organization) => (
            <li key={organization.organization_id} onClick={() => navigate(`${organization.organization_id}`)}>
              <h3 className="flex justify-center">{organization.organization_name}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OrganizationList;
