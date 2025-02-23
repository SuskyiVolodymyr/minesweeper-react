import { CellType } from '../types/CellType';
import { Cell } from './CellClass';

function countBombNeighbours(cells: Cell[][]) {
  const newRows: Cell[][] = [];

  for (let row = 0; row < cells.length; row++) {
    const newRow: Cell[] = [];

    for (let column = 0; column < cells[row].length; column++) {
      const cell = cells[row][column];

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
        const rowDx = row + dx;
        const colDx = column + dy;

        if (cells[rowDx]?.[colDx]?.hasBomb) {
          cell.bombsAround += 1;
        }
      }

      newRow.push(cell);
    }

    newRows.push(newRow);
  }

  return newRows;
}

export const generateTable = (rows: number, columns: number, bombsCount: number): CellType[][] => {
  const bombs: boolean[][] = [];
  let totalAddedBombs = 0;

  for (let i = 0; i < rows; i++) {
    const newRow: boolean[] = [];

    for (let j = 0; j < columns; j++) {
      newRow.push(false);
    }

    bombs.push(newRow);
  }

  while (totalAddedBombs !== bombsCount) {
    const randRow = Math.floor(Math.random() * rows);
    const randCol = Math.floor(Math.random() * columns);

    if (bombs[randRow][randCol]) {
      continue;
    }

    bombs[randRow][randCol] = true;
    totalAddedBombs += 1;
  }

  const newRows: Cell[][] = [];

  for (let i = 0; i < rows; i++) {
    const newRow: Cell[] = [];

    for (let j = 0; j < columns; j++) {
      newRow.push(new Cell(bombs[i][j], i, j));
    }

    newRows.push(newRow);
  }

  return countBombNeighbours(newRows).map((row) => row.map((cell) => ({ ...cell })));
};
