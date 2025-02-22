import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { getScores } from '../../utils/localStorage';
import './BestScores.css';

export const BestScores: React.FC = () => {
  const { difficulty } = useAppSelector((state) => state.game);
  const scores = getScores(difficulty).sort().slice(0, 10);

  return (
    <div className="best-score-list">
      <p>Best scores for {difficulty} difficulty</p>
      {scores.map((score, i) => (
        <p key={i}>
          {i + 1}: {score}
        </p>
      ))}
    </div>
  );
};
