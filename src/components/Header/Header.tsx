import React, { useEffect } from 'react';

import './Header.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { difficultySlice } from '../../features/difficultySlice';
import { DifficultySelect } from '../../types/DifficultySelect';

export const Header = () => {
  const { difficulty } = useAppSelector((store) => store.difficulty);
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <div className="header">
      <select
        className="difficulty-select header-items"
        value={difficulty}
        onChange={(e) => dispatch(difficultySlice.actions.set(e.target.value as DifficultySelect))}
      >
        <option>Easy</option>
        <option>Normal</option>
      </select>
      <p className="header-items">Time:</p>
      <p className="header-items">BombsLeft:</p>
    </div>
  );
};
