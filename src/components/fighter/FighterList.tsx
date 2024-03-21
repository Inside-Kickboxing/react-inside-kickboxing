import React from 'react';
import { getAllFighters } from '../../api/supabaseDb';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const FighterList = () => {
  const navigate = useNavigate();
  const {
    data: fighters,
    isLoading: fightersLoading,
    isError: fightersError,
  } = useQuery({
    queryKey: ['fighters'],
    queryFn: () => getAllFighters(),
    staleTime: 1000 * 60 * 5, // 1 minute
  });

  if (fightersLoading) {
    return <div>Loading...</div>;
  }

  if (fightersError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div>
      <h2>Fighters</h2>
      <ul>
        {fighters &&
          fighters.map((fighter) => (
            <li key={fighter.fighter_id} onClick={() => navigate(`${fighter.fighter_id}`)}>
              <div>{fighter.fighter_name}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FighterList;
