import { useQuery } from '@tanstack/react-query';
import { getAllEvents, getOrganizationById } from '../../api/supabaseDb';
import { formatDateTime } from '../../utils/dateUtils'; // Import the formatDateTime function
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

  const {
    data: organization,
    isLoading: organizationLoading,
    isError: organizationError,
  } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getOrganizationById(events?.map((event) => event.organization_id) ?? []),
  });

  // Check if either events or organization data is still loading
  if (eventsLoading || organizationLoading) {
    return <div>Loading...</div>;
  }

  // Check if there was an error fetching events or organizations
  if (eventsError || organizationError) {
    return <div>Error fetching data</div>;
  }

  // Check if organization data is not available yet
  if (!organization) {
    return <div>Loading organization data...</div>;
  }

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events &&
          events.map((event) => {
            const org = organization.find((org) => org.organization_id === event.organization_id);
            return (
              <li key={event.event_id} onClick={() => navigate(`${event.event_id}`)}>
                <div>{org ? org.organization_name : ''} presents</div>
                <div>{event.event_name}</div>
                {event.event_date && <div>{formatDateTime(event.event_date)}</div>}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default EventList;
