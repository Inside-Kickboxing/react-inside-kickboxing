import { getEventById, getFightersByFightId, getFightsByEventId } from '../../api/supabaseDb';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import React from 'react';



const EventDetail = (props: { event: any; fighters: any }) => {
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
  const { data: fighters, isLoading: fightersLoading } = useQuery({
    queryKey: ['fighters', fights?.map((fight) => fight.fight_id)],
    queryFn: () => fights && fighterByFightIdLoader(fights.map((fight) => fight.fight_id)),
    enabled: !!fights, // Only enable the query when fights are loaded
  });

  if (!id || eventsLoading || fightsLoading || fightersLoading || !event || !fights || !fighters) {
    return <div>Loading...</div>;
  }

  // Group fighters by fight ID
  const fightersByFightId: { [key: number]: any[] } = {};
  fighters.forEach((fighter: any) => {
    const fightId = fighter.fight_id;
    if (!fightersByFightId[fightId]) {
      fightersByFightId[fightId] = [];
    }
    fightersByFightId[fightId].push(fighter);
  });

  return (
    <div>
      <h2 className="flex justify-center text-xl">{event.event_name}</h2>
      <img src={event.photo_url ?? ''} alt={event.event_name} width={300} />
      <div className="flex justify-center">
        <ul>
          {Object.keys(fightersByFightId).map((fightId: string) => (
            <li key={fightId}>
              <h3>Fight ID {fightId}:</h3>
              <ul>
                {fightersByFightId[parseInt(fightId)].map((fighter: any, index: number) => (
                  <React.Fragment key={fighter.fighter_id}>
                    {fighter.fighter_name}
                    {index !== fightersByFightId[parseInt(fightId)].length - 1 && <br /> && ' vs '}
                  </React.Fragment>
                ))}
              </ul>
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

  const fights = await getFightsByEventId([parseInt(id)]);
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
