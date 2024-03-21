import { getEventById, getFightersInFightByFightId, getFightsByEventId } from '../../api/supabaseDb';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();
  console.log('organization ID:', id);

  const { data: event, isLoading: eventsLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventLoader(id),
  });

  const { data: fights, isLoading: fightsLoading } = useQuery({
    queryKey: ['fights', id],
    queryFn: () => fightLoader(id),
  });

  const { data: fightersInFight, isLoading: fightersInFightLoading } = useQuery({
    queryKey: ['fightersInFight', id],
    queryFn: () => fightersInFightLoader(id),
  });

  // Add a check for undefined ID
  if (id === undefined) {
    console.log('ID is undefined');
    // Handle the error or navigate to an error page
    return <div>Loading...</div>;
  }

  if (
    eventsLoading ||
    fightsLoading ||
    fightersInFightLoading ||
    event == undefined ||
    event == null ||
    fights == undefined ||
    fights == null ||
    fightersInFight == undefined ||
    fightersInFight == null
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{event.event_name}</h2>
      <ul>
        {fights.map((fight) => (
          <li key={fight.fight_id}>
            <div>Fight#{fight.fight_id}</div>
            <>
              {fightersInFight.map((fighter) => (
                <li>{fighter.fighter_id}</li>
              ))}
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetail;

export const eventLoader = async (id: string | undefined) => {
  if (id === undefined) {
    console.log('Event ID is undefined');
    // Handle the error or navigate to an error page
    return null;
  }

  const event = await getEventById([parseInt(id)]);
  return event ? event[0] : null;
};

export const fightLoader = async (id: string | undefined) => {
  if (id === undefined) {
    console.log('Event ID is undefined');
    // Handle the error or navigate to an error page
    return null;
  }

  const fights = await getFightsByEventId([parseInt(id)]);
  return fights ? fights : null;
};

export const fightersInFightLoader = async (id: string | undefined) => {
  if (id === undefined) {
    console.log('Event ID is undefined');
    // Handle the error or navigate to an error page
    return null;
  }

  const fightersInFight = await getFightersInFightByFightId([parseInt(id)]);
  return fightersInFight ? fightersInFight : null;
};
