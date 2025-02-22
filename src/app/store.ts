import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from '../features/gameSlice';
import { tableSlice } from '../features/tableSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    table: tableSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
