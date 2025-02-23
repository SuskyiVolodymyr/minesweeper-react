import React, { useEffect } from 'react';

import './Header.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { gameSlice } from '../../features/gameSlice';
import { DifficultySelect } from '../../types/DifficultySelect';
import { formatTime } from '../../utils/formatTime';

export const Header = () => {
  const { difficulty, gameStatus, time } = useAppSelector((store) => store.game);
  const { bombsLeft } = useAppSelector((store) => store.table);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gameStatus === 'started') {
      const timer = setInterval(() => {
        dispatch(gameSlice.actions.setTime());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [dispatch, gameStatus]);

  return (
    <div className="header">
      <select
        className="difficulty-select header-items"
        value={difficulty}
        onChange={(e) =>
          dispatch(gameSlice.actions.setDifficulty(e.target.value as DifficultySelect))
        }
        disabled={gameStatus !== 'idle'}
      >
        <option>Easy</option>
        <option>Normal</option>
        <option>Hard</option>
      </select>
      <p className="header-items">Time: {formatTime(time)}</p>
      <p className="header-items">BombsLeft: {bombsLeft > 0 ? bombsLeft : 0}</p>
    </div>
  );
};
