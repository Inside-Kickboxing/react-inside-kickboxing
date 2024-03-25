import useGetAllFighters from '@/hooks/useGetAllFighters';
import { useNavigate } from 'react-router-dom';

const FighterList = () => {
  const navigate = useNavigate();
  const { fighters, isFightersLoading, isFightersError } = useGetAllFighters();

  if (isFightersLoading) {
    return <div>Loading...</div>;
  }

  if (isFightersError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div>
      <h2 className="flex justify-center text-xl">Fighters</h2>
      <ul>
        {fighters &&
          fighters.map((fighter) => (
            <li
              key={fighter.fighter_id}
              onClick={() => navigate(`${fighter.fighter_id}`)}
              className="flex justify-center text-s"
            >
              <div>{fighter.fighter_name}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FighterList;
