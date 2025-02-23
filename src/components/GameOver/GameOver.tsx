import React from 'react';

import './GameOver.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { gameSlice } from '../../features/gameSlice';
import { generateTable } from '../../utils/generateTable';
import { tableSlice } from '../../features/tableSlice';
import { fieldProperties } from '../../utils/fieldProperties';

export const GameOver: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gameStatus, difficulty } = useAppSelector((state) => state.game);

  const handleRestart = () => {
    dispatch(gameSlice.actions.setGameStatus('idle'));
    const properties = fieldProperties[difficulty];
    const newTable = generateTable(properties.rows, properties.columns, properties.bombs);

    dispatch(tableSlice.actions.set(newTable));
    dispatch(tableSlice.actions.setBombs(properties.bombs));
    dispatch(gameSlice.actions.clearTime());
  };

  return (
    <div className={gameStatus === 'lose' ? 'game-over lose' : 'game-over win'}>
      <p className="game-over-title">{gameStatus === 'lose' ? 'Lose' : 'Win'}</p>
      <button
        className={gameStatus === 'lose' ? 'restart-button lose' : 'restart-button win'}
        onClick={handleRestart}
      >
        Restart
      </button>
    </div>
  );
};
