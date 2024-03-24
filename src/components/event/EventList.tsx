import { useQuery } from '@tanstack/react-query';
import { getAllEvents } from '../../api/supabaseDb';
import { formatDateTime } from '../../utils/dateFormatter'; // Import the formatDateTime function
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const navigate = useNavigate();
  const {
    data: events,
    isLoading: eventsLoading,
    isError: eventsError,
  } = useQuery({
    queryKey: ['events'],
    queryFn: () => getAllEvents(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Check if either events or organization data is still loading
  if (eventsLoading) {
    return <div>Loading...</div>;
  }

  // Check if there was an error fetching events or organizations
  if (eventsError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h2 className="flex justify-center text-xl">Events</h2>
      <ul>
        {events &&
          events.map((event) => {
            return (
              <li key={event.id} onClick={() => navigate(`${event.id}`)}>
                <img src={event.photo_url ?? ''} alt={event.name} width={300} />
                <div>{event.name}</div>
                {event.date && <div>{formatDateTime(event.date)}</div>}
                <span>{event.location}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default EventList;
