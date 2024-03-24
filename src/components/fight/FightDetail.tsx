import React from 'react';
import { Fight, Fighter } from '@/interfaces';

interface Props {
  fight: Fight;
  fighters: Fighter[];
}

const FightDetail: React.FC<Props> = ({ fight, fighters }) => {

  return (
    <div>
      <h3>
        Fight ID {fight.id} {fight.weight_class} {fight.title_name}
      </h3>
      <ul>
        {fighters.map((fighter, index) => (
          <React.Fragment key={fighter.id}>
            <span>{fighter.name} </span>
            {index !== fighters.length - 1 && <span> vs </span>}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default FightDetail;
