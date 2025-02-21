/* eslint-disable no-param-reassign */

import { DifficultySelect } from '../types/DifficultySelect';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  difficulty: 'easy' as DifficultySelect,
};

export const difficultySlice = createSlice({
  name: 'difficulty',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<DifficultySelect>) => {
      state.difficulty = action.payload;
    },
  },
});
