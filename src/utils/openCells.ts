import { CellType } from '../types/CellType';

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

export function openCells(cells: CellType[][], initialCell: CellType) {
  const newCells = cells.map((row) => row.map((cell) => ({ ...cell })));
  const newInitialCell = { ...initialCell };
  const openedCells: number[] = [];

  function recursiveOpen(cell: CellType) {
    const newCell = { ...cell };

    newCell.isOpen = true;
    openedCells.push(newCell.id);
    newCells[newCell.row][newCell.column] = newCell;

    if (cell.bombsAround === 0 && !cell.hasBomb) {
      for (const [dx, dy] of directions) {
        const rowDx = cell.row + dx;
        const colDx = cell.column + dy;

        if (!newCells[rowDx]?.[colDx]) {
          continue;
        }

        if (!openedCells.includes(newCells[rowDx][colDx].id)) {
          recursiveOpen(newCells[rowDx][colDx]);
        }
      }
    }
  }

  recursiveOpen(newInitialCell);

  return newCells;
}
