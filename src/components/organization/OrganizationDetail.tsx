import { useParams } from 'react-router-dom';
import useGetOrganization from '@/hooks/useGetOrganization';

const OrganizationDetail = () => {
  const { id } = useParams();
  const { organization, isOrganizationLoading } = useGetOrganization(Number(id));

  if (isOrganizationLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="flex justify-center text-xl">{organization?.organization_name}</h2>
      <div className="flex justify-center">
        <img src={organization?.photo_url ?? ''} alt={organization?.organization_name} width={300} />
      </div>
      <p className="flex justify-center">{organization?.organization_description}</p>
    </div>
  );
};

export default OrganizationDetail;
