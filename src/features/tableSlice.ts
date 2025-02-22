/* eslint-disable no-param-reassign */

import { CellType } from '../types/CellType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  rows: [] as CellType[][],
  bombsLeft: 0,
  openCells: 0,
};

function openCells(cells: CellType[][], initialCell: CellType) {
  const newCells = cells.map((row) => row.map((cell) => ({ ...cell })));
  const newInitialCell = newCells.flat().find((cell) => cell.id === initialCell.id) as CellType;
  const openedCells: CellType[] = [];

  function recursiveOpen(cell: CellType) {
    cell.isOpen = true;
    openedCells.push(cell);
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    if (cell.bombsAround === 0 && !cell.hasBomb) {
      for (const [dx, dy] of directions) {
        const rowDx = cell.row + dx;
        const colDx = cell.column + dy;

        if (!newCells[rowDx]?.[colDx]) {
          continue;
        }

        if (!openedCells.includes(newCells[rowDx][colDx])) {
          recursiveOpen(newCells[rowDx][colDx]);
        }
      }
    }
  }

  recursiveOpen(newInitialCell);

  return newCells;
}

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
