import { DifficultySelect } from '../types/DifficultySelect';

function getKey(difficulty: DifficultySelect) {
  switch (difficulty) {
    case 'Easy':
      return 'easy-scores';
    case 'Normal':
      return 'normal-scores';
    case 'Hard':
      return 'hard-scores';
    default:
      return 'easy-scores';
  }
}

export const getScores = (difficulty: DifficultySelect) => {
  const items = localStorage.getItem(getKey(difficulty));

  return items ? (JSON.parse(items) as string[]) : ([] as string[]);
};

export const addScore = (difficulty: DifficultySelect, score: string) => {
  const key = getKey(difficulty);
  const items = localStorage.getItem(key);

  if (items) {
    const parsedScores = items ? (JSON.parse(items) as string[]) : ([] as string[]);

    localStorage.setItem(key, JSON.stringify([...parsedScores, score]));
  } else {
    localStorage.setItem(key, JSON.stringify([score]));
  }
};
