import React from 'react';
import { Fight, Fighter } from '@/interfaces';
import FightDetails from './FightDetail';

interface Props {
  fights: Fight[];
  fighters: Fighter[];
}

const FightList: React.FC<Props> = ({ fights, fighters }) => {
  return (
    <div className="flex justify-center">
      <ul>
        {fights.map((fight) => (
          <li key={fight.fight_id}>
            <FightDetails fight={fight} fighters={fighters} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FightList;
