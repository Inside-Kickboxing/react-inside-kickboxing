import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEventById, getFightsByEventId, getFightersByFightId } from '../../api/supabaseDb';
// import FightList from '../fight/FightList';

const EventDetail = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const { data: event, isLoading: eventsLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventLoader(id),
  });

  const { data: fights, isLoading: fightsLoading } = useQuery({
    queryKey: ['fights', id],
    queryFn: () => fightLoader(id),
  });

  const { data: fighters, isLoading: fightersLoading } = useQuery({
    queryKey: ['fighters', fights?.map((fight) => fight.fight_id)],
    queryFn: () => fights && fighterByFightIdLoader(fights.map((fight) => fight.fight_id)),
    enabled: !!fights,
  });

  if (!id || eventsLoading || fightsLoading || fightersLoading || !event || !fights || !fighters) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="flex justify-center text-xl">{event.event_name}</h2>
      <img src={event.photo_url ?? ''} alt={event.event_name} width={300} />
      {/* <FightList fights={fights} fighters={fighters} /> */}
    </div>
  );
};

export default EventDetail;

export const eventLoader = async (id: string | undefined) => {
  if (!id) {
    //console.log('Event ID is undefined');
    return null;
  }

  const event = await getEventById([parseInt(id)]);
  return event ? event[0] : null;
};

export const fightLoader = async (id: string | undefined) => {
  if (!id) {
    // console.log('Event ID is undefined');
    return null;
  }

  const fights = await getFightsByEventId(Number(id));
  return fights ? fights : null;
};

export const fighterByFightIdLoader = async (fightIds: number[] | undefined) => {
  if (!fightIds || fightIds.length === 0) {
    // console.log('Fight IDs are undefined or empty');
    return null;
  }

  try {
    const fighters = await getFightersByFightId(fightIds);
    return fighters || null;
  } catch (error) {
    console.error('Error fetching fighters:', error);
    return null;
  }
};
