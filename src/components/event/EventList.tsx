import { formatDateTime } from '../../utils/dateFormatter'; // Import the formatDateTime function
import { useNavigate } from 'react-router-dom';
import useGetAllEvents from '@/hooks/useGetAllEvents';

const EventList = () => {
  const navigate = useNavigate();
  const { events, isEventsLoading, isEventsError } = useGetAllEvents();

  // Check if either events or organization data is still loading
  if (isEventsLoading) {
    return <div>Loading...</div>;
  }

  // Check if there was an error fetching events or organizations
  if (isEventsError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h2 className="flex justify-center text-xl">Events</h2>
      <ul>
        {events &&
          events.map((event) => {
            return (
              <li key={event.event_id} onClick={() => navigate(`${event.event_id}`)}>
                <img src={event.photo_url ?? ''} alt={event.event_name} width={300} />
                <div>{event.event_name}</div>
                {event.event_date && <div>{formatDateTime(event.event_date)}</div>}
                <span>{event.event_location}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default EventList;
