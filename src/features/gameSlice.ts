/* eslint-disable no-param-reassign */

import { DifficultySelect } from '../types/DifficultySelect';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStatus } from '../types/GameStatus';

type StateType = {
  difficulty: DifficultySelect;
  gameStatus: GameStatus;
  time: number;
};

const initialState: StateType = {
  difficulty: 'Easy',
  gameStatus: 'idle',
  time: 0,
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
    setTime: (state) => {
      state.time += 1;
    },
    clearTime: (state) => {
      state.time = 0;
    },
  },
});
