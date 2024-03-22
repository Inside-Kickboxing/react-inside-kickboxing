import { getEventById, getFightsByEventId } from '../../api/supabaseDb';
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

  // Add a check for undefined ID
  if (id === undefined) {
    console.log('ID is undefined');
    // Handle the error or navigate to an error page
    return <div>Loading...</div>;
  }

  if (eventsLoading || fightsLoading || event == undefined || event == null || fights == undefined || fights == null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="flex justify-center text-xl">{event.event_name}</h2>
      <img src={event.photo_url ?? ''} alt={event.event_name} width={300} />
      <div className="flex justify-center">
        <ul></ul>
      </div>
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
