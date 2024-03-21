import { getEventById } from '../../api/supabaseDb';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();
  console.log('organization ID:', id);

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventLoader(id),
  });

  // Add a check for undefined ID
  if (id === undefined) {
    console.log('ID is undefined');
    // Handle the error or navigate to an error page
    return <div>Loading...</div>;
  }

  if (isLoading || event == undefined || event == null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{event.event_name}</h2>
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
