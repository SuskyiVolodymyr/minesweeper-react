import * as React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Minefield } from './components/Minefield';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { GameOver } from './components/GameOver';
import { BestScores } from './components/BestScores';
import { generateTable } from './utils/generateTable';
import { tableSlice } from './features/tableSlice';
import { useCallback, useEffect } from 'react';
import { DifficultySelect } from './types/DifficultySelect';
import { fieldProperties } from './utils/fieldProperties';
import { gameSlice } from './features/gameSlice';

export const App: React.FC = () => {
  const { gameStatus, difficulty } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const restartGame = useCallback(
    (diff: DifficultySelect) => {
      const properties = fieldProperties[diff];
      const newTable = generateTable(properties.rows, properties.columns, properties.bombs);

      dispatch(tableSlice.actions.set(newTable));
      dispatch(tableSlice.actions.setBombs(properties.bombs));
      dispatch(gameSlice.actions.clearTime());
    },
    [dispatch],
  );

  useEffect(() => {
    restartGame(difficulty);
  }, [dispatch, restartGame, difficulty]);

  return (
    <div className="container">
      <BestScores />
      <div className="body">
        <Header />
        <Minefield />
        {(gameStatus === 'lose' || gameStatus === 'win') && <GameOver onRestart={restartGame} />}
      </div>
    </div>
  );
};
