import * as React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Minefield } from './components/Minefield';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { GameOver } from './components/GameOver';
import { BestScores } from './components/BestScores';
import { fieldProperties } from './utils/fieldProperties';
import { generateTable } from './utils/generateTable';
import { tableSlice } from './features/tableSlice';
import { useCallback, useEffect } from 'react';

export const App: React.FC = () => {
  const { gameStatus } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const restartGame = useCallback(() => {
    const properties = fieldProperties.Easy;
    const newTable = generateTable(properties.rows, properties.columns, properties.bombs);

    dispatch(tableSlice.actions.set(newTable));
    dispatch(tableSlice.actions.setBombs(properties.bombs));
  }, [dispatch]);

  useEffect(() => {
    restartGame();
  }, [dispatch, restartGame]);

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
