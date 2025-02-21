import { configureStore } from '@reduxjs/toolkit';
import { difficultySlice } from '../features/difficultySlice';
import { tableSlice } from '../features/tableSlice';

export const store = configureStore({
  reducer: {
    difficulty: difficultySlice.reducer,
    table: tableSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
