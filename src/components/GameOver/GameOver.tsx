import React from 'react';

import './GameOver.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { gameSlice } from '../../features/gameSlice';
import { DifficultySelect } from '../../types/DifficultySelect';

type Props = {
  onRestart: (difficulty: DifficultySelect) => void;
};

export const GameOver = ({ onRestart }: Props) => {
  const dispatch = useAppDispatch();
  const { gameStatus, difficulty } = useAppSelector((state) => state.game);

  const handleRestart = () => {
    dispatch(gameSlice.actions.setGameStatus('idle'));
    onRestart(difficulty);
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
