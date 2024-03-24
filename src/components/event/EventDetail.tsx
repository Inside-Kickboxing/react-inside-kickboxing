import { useParams } from 'react-router-dom';
import useGetEvent from '@/hooks/useGetEvent';
import FightList from '../fight/FightList';
import useGetFightsByEvent from '@/hooks/useGetFightsByEvent';

const EventDetail = () => {
  const { id } = useParams();
  const { event, isEventLoading } = useGetEvent(Number(id));
  const { eventFights, isEventFightsLoading } = useGetFightsByEvent(Number(id));

  if (isEventLoading || isEventFightsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="flex justify-center text-xl">{event?.name}</h2>
      <img src={event?.photo_url ?? ''} alt={event?.name} width={300} />
      {eventFights?.map((fight) => <FightList key={fight.id} fight={fight} />)}
    </div>
  );
};

export default EventDetail;
