import React from 'react';
import { getAllOrganizations } from '../../api/supabaseDb';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const OrganizationList = () => {
  const navigate = useNavigate();
  const {
    data: organizations,
    isLoading: organizationsLoading,
    isError: organizationsError,
  } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getAllOrganizations(),
  });

  if (organizationsLoading) {
    return <div>Loading...</div>;
  }

  if (organizationsError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div>
      <h2>Organizations</h2>
      <ul>
        {organizations &&
          organizations.map((organization) => (
            <li key={organization.organization_id} onClick={() => navigate(`${organization.organization_id}`)}>
              <img src={organization.photo_url ?? ''} alt={organization.organization_name} width={150} />
              <div>{organization.organization_name}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OrganizationList;
