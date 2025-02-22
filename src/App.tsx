import * as React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Minefield } from './components/Minefield';
import { useAppSelector } from './app/hooks';
import { GameOver } from './components/GameOver';
import { BestScores } from './components/BestScores';

export const App: React.FC = () => {
  const { gameStatus } = useAppSelector((state) => state.game);

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
