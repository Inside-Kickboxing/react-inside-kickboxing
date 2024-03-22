import React from 'react';
import { Fight, Fighter } from '@/interfaces';

interface Props {
  fight: Fight;
  fighters: Fighter[];
}

const FightDetail: React.FC<Props> = ({ fight, fighters }) => {
  const fightFighters = fighters.filter((fighter) => fighter.fight_id === fight.fight_id);

  return (
    <div>
      <h3>
        Fight ID {fight.fight_id} {fight.weight_class} {fight.title_name}
      </h3>
      <ul>
        {fightFighters.map((fighter, index) => (
          <React.Fragment key={fighter.fighter_id}>
            <span>{fighter.fighter_name} </span>
            {index !== fightFighters.length - 1 && <span> vs </span>}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default FightDetail;
