import * as React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Minefield } from './components/Minefield';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { GameOver } from './components/GameOver';
import { BestScores } from './components/BestScores';
import { fieldProperties } from './utils/fieldProperties.ts';
import { generateTable } from './utils/generateTable';
import { tableSlice } from './features/tableSlice';
import { useEffect } from 'react';

export const App: React.FC = () => {
  const { gameStatus } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const properties = fieldProperties.Easy;
    const newTable = generateTable(properties.rows, properties.columns, properties.bombs);

    dispatch(tableSlice.actions.set(newTable));
    dispatch(tableSlice.actions.setBombs(properties.bombs));
  }, [dispatch]);

  return (
    <div className="container">
      <BestScores />
      <div className="body">
        <Header />
        <Minefield />
        {(gameStatus === 'lose' || gameStatus === 'win') && <GameOver />}
      </div>
    </div>
  );
};
