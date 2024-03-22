import { getFighterById } from '../../api/supabaseDb';
import { /*useNavigate,*/ useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const FighterDetail = () => {
  // const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();
  console.log('Fighter ID:', id);

  const { data: fighter, isLoading } = useQuery({
    queryKey: ['fighter', id],
    queryFn: () => fighterLoader(id),
  });

  // Add a check for undefined ID
  if (id === undefined) {
    console.log('ID is undefined');
    // Handle the error or navigate to an error page
    return <div>Loading...</div>;
  }

  if (isLoading || fighter == undefined || fighter == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center text-xl">
      <h2>{fighter.fighter_name}</h2>
    </div>
  );
};

export default FighterDetail;

export const fighterLoader = async (id: string | undefined) => {
  if (id === undefined) {
    console.log('Fighter ID is undefined');
    // Handle the error or navigate to an error page
    return null;
  }

  const fighter = await getFighterById([parseInt(id)]);
  return fighter ? fighter[0] : null;
};
