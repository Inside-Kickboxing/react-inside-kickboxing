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
              key={fighter.id}
              onClick={() => navigate(`${fighter.id}`)}
              className="flex justify-center text-s"
            >
              <div>{fighter.name}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FighterList;
