import React from 'react';
import { Fight } from '@/interfaces';
import FightDetails from './FightDetail';
import useGetFightersByFight from '@/hooks/useGetFightersByFight';

interface Props {
  fight: Fight;
}

const FightList: React.FC<Props> = ({ fight }) => {
  const { fighters } = useGetFightersByFight(fight.id);

  return (
    <div>
      <ul>
        <li key={fight.id}>
          { fighters && (<FightDetails fight={fight} fighters={fighters} />) }
        </li>
      </ul>
    </div>
  );
};

export default FightList;
