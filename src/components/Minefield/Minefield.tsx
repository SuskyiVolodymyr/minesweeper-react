import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './Minefield.css';
import { Cell } from '../Cell';
import { fieldProperties } from '../../utils/fieldProperties.ts';

export const Minefield: React.FC = () => {
  const { difficulty } = useAppSelector((state) => state.game);
  const { rows: table } = useAppSelector((state) => state.table);

  return (
    <div
      className="table"
      style={{
        gridTemplateRows: `repeat(${fieldProperties[difficulty].rows}, 1fr)`,
        gridTemplateColumns: `repeat(${fieldProperties[difficulty].columns}, 1fr)`,
      }}
    >
      {table.flat().map((cell) => (
        <Cell cell={cell} key={cell.id} />
      ))}
    </div>
  );
};
