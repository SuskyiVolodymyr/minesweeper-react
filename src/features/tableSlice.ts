/* eslint-disable no-param-reassign */

import { CellType } from '../types/CellType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  rows: [] as CellType[][],
};

function openCells(cells: CellType[][], initialCell: CellType) {
  const newCells = cells.map((row) => row.map((cell) => ({ ...cell })));
  const newInitialCell = newCells.flat().find((cell) => cell.id === initialCell.id) as CellType;
  const openedCells: CellType[] = [];

  function recursiveOpen(cell: CellType) {
    if (cell.bombsAround === 0) {
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

      for (const [dx, dy] of directions) {
        const rowDx = cell.row + dx;
        const colDx = cell.column + dy;

        if (newCells[rowDx]?.[colDx]?.bombsAround === 0) {
          if (!openedCells.includes(newCells[rowDx][colDx])) {
            recursiveOpen(newCells[rowDx][colDx]);
          }
        }
      }
    } else {
      cell.isOpen = true;
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
    },
    openCell: (state, action: PayloadAction<CellType>) => {
      state.rows = openCells(state.rows, action.payload);
    },
  },
});
