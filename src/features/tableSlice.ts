/* eslint-disable no-param-reassign */

import { CellType } from '../types/CellType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countOpenedCells } from '../utils/openCells';

type InitialStateType = {
  rows: CellType[][];
  bombsLeft: number;
  openedCells: number;
};

const initialState: InitialStateType = {
  rows: [],
  bombsLeft: 0,
  openedCells: 0,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<CellType[][]>) => {
      state.rows = action.payload;
      state.openedCells = 0;
    },
    openCell: (state, action: PayloadAction<CellType[][]>) => {
      state.rows = action.payload;
      state.openedCells = countOpenedCells(action.payload);
    },
    openAll: (state) => {
      state.rows = state.rows.map((row) =>
        row.map((cell) => ({ ...cell, hasFlag: false, isOpen: true })),
      );
      state.bombsLeft = 0;
    },
    setBombs: (state, action: PayloadAction<number>) => {
      state.bombsLeft = action.payload;
    },
    setFlag: (state, action: PayloadAction<CellType>) => {
      state.rows = state.rows.map((row) =>
        row.map((cell) => {
          return cell.id === action.payload.id ? { ...cell, hasFlag: !cell.hasFlag } : cell;
        }),
      );
      state.bombsLeft = action.payload.hasFlag ? state.bombsLeft + 1 : state.bombsLeft - 1;
    },
  },
});
