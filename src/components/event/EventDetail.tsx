import { getEventById, getFightersByFightId, getFightsByEventId } from '../../api/supabaseDb';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();

  const { data: event, isLoading: eventsLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventLoader(id),
  });

  const { data: fights, isLoading: fightsLoading } = useQuery({
    queryKey: ['fights', id],
    queryFn: () => fightLoader(id),
  });

  // Ensure fights is defined before using it
  const { data: fighters, isLoading: isLoading } = useQuery({
    queryKey: ['fighters', fights?.map((fight) => fight.fight_id)],
    queryFn: () => fights && fighterByFightIdLoader(fights.map((fight) => fight.fight_id)),
    enabled: !!fights, // Only enable the query when fights are loaded
  });

  // Log the fighters array to investigate its structure
  console.log(fighters);

  if (!id || eventsLoading || fightsLoading || isLoading || !event || !fights || !fighters) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="flex justify-center text-xl">{event.event_name}</h2>
      <img src={event.photo_url ?? ''} alt={event.event_name} width={300} />
      <div className="flex justify-center">
        <ul>
          {fights.map((fight) => (
            <li key={fight.fight_id}>
              {/* Render fight details here */}
              <div>Fight#{fight.fight_id}</div>
              {/* Add more fight details as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventDetail;

export const eventLoader = async (id: string | undefined) => {
  if (!id) {
    console.log('Event ID is undefined');
    return null;
  }

  const event = await getEventById([parseInt(id)]);
  return event ? event[0] : null;
};

export const fightLoader = async (id: string | undefined) => {
  if (!id) {
    console.log('Event ID is undefined');
    return null;
  }

  const fights = await getFightsByEventId([parseInt(id)]);
  return fights ? fights : null;
};

export const fighterByFightIdLoader = async (fightIds: number[] | undefined) => {
  if (!fightIds) {
    console.log('Fight IDs are undefined');
    return null;
  }
  console.log(fightIds);
  const fighters = await getFightersByFightId(fightIds);
  console.log(fighters);
  return fighters ? fighters : null;
};
