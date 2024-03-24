import useGetFighter from '@/hooks/useGetFighter';
import { /*useNavigate,*/ useParams } from 'react-router-dom';

const FighterDetail = () => {
  // const navigate = useNavigate();
  const { id } = useParams();
  console.log('Fighter ID:', id);

  const { fighter, isFighterLoading } = useGetFighter(Number(id));

  if (isFighterLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center text-xl">
      {fighter?.photo_url && (
        <img src={fighter?.photo_url}/>
      )}
      <h2>{fighter?.name}</h2>
    </div>
  );
};

export default FighterDetail;
