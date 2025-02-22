import React from 'react';

import './GameOver.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { gameSlice } from '../../features/gameSlice';

export const GameOver: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gameStatus } = useAppSelector((state) => state.game);

  return (
    <div className={gameStatus === 'lose' ? 'game-over lose' : 'game-over win'}>
      <p className="game-over-title">{gameStatus === 'lose' ? 'Lose' : 'Win'}</p>
      <button
        className={gameStatus === 'lose' ? 'restart-button lose' : 'restart-button win'}
        onClick={() => dispatch(gameSlice.actions.setGameStatus('idle'))}
      >
        Restart
      </button>
    </div>
  );
};
