import * as React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Minefield } from './components/Minefield';

export const App: React.FC = () => {
  return (
    <div className="body">
      <Header />
      <Minefield />
    </div>
  );
};
