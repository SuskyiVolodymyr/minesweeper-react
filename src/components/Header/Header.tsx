import React, { useEffect, useState } from 'react';

import './Header.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { gameSlice } from '../../features/gameSlice';
import { DifficultySelect } from '../../types/DifficultySelect';
import { addScore } from '../../utils/localStorage.ts';

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':');
};

export const Header = () => {
  const { difficulty, gameStatus } = useAppSelector((store) => store.game);
  const { bombsLeft } = useAppSelector((store) => store.table);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    switch (gameStatus) {
      case 'started':
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setTimerId(window.setInterval(() => setTime((prev) => prev + 1), 1000));
        break;
      case 'lose':
        window.clearInterval(timerId);
        break;
      case 'win': {
        addScore(difficulty, formatTime(time));

        window.clearInterval(timerId);
        break;
      }

      case 'idle':
        setTime(0);
        break;
      default:
        break;
    }
  }, [gameStatus]);

  useEffect(() => {}, []);

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
