/* eslint-disable no-param-reassign */

import { DifficultySelect } from '../types/DifficultySelect';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStatus } from '../types/GameStatus';

const initialState = {
  difficulty: 'easy' as DifficultySelect,
  gameStatus: 'idle' as GameStatus,
};

export const gameSlice = createSlice({
  name: 'difficulty',
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<DifficultySelect>) => {
      state.difficulty = action.payload;
    },
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },
  },
});
