/* eslint-disable no-param-reassign */

import { CellType } from '../types/CellType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { openCells } from '../utils/openCells';

type InitialStateType = {
  rows: CellType[][];
  bombsLeft: number;
  openCells: number;
};

const initialState: InitialStateType = {
  rows: [],
  bombsLeft: 0,
  openCells: 0,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<CellType[][]>) => {
      state.rows = action.payload;
      state.openCells = 0;
    },
    openCell: (state, action: PayloadAction<CellType>) => {
      const newCells = openCells(state.rows, action.payload);

      state.rows = newCells;
      state.openCells = newCells.flat().reduce((prev, cell) => {
        return cell.isOpen ? prev + 1 : prev;
      }, 0);
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
    increaseBombs: (state) => {
      state.bombsLeft += 1;
    },
    decreaseBombs: (state) => {
      state.bombsLeft -= 1;
    },
    setFlag: (state, action: PayloadAction<CellType>) => {
      state.rows = state.rows.map((row) =>
        row.map((cell) => {
          return cell.id === action.payload.id ? { ...cell, hasFlag: !cell.hasFlag } : cell;
        }),
      );
    },
  },
});
