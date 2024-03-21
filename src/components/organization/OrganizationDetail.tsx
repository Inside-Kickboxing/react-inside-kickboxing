import { getOrganizationById } from '../../api/supabaseDb';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const OrganizationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();
  console.log('Organization ID:', id);

  const { data: organization, isLoading } = useQuery({
    queryKey: ['organization', id],
    queryFn: () => organizationLoader(id),
  });

  // Add a check for undefined ID
  if (id === undefined) {
    console.log('ID is undefined');
    // Handle the error or navigate to an error page
    return <div>Loading...</div>;
  }

  if (isLoading || organization == undefined || organization == null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center">
        <img src={organization.photo_url ?? ''} alt={organization.organization_name} width={300} />
      </div>
      <h2 className="flex justify-center text-xl">{organization.organization_name}</h2>
      <p className="flex justify-center">{organization.organization_description}</p>
    </div>
  );
};

export default OrganizationDetail;

export const organizationLoader = async (id: string | undefined) => {
  if (id === undefined) {
    console.log('Organization ID is undefined');
    // Handle the error or navigate to an error page
    return null;
  }

  const organization = await getOrganizationById([parseInt(id)]);
  return organization ? organization[0] : null;
};
