import { CellType } from '../types/CellType';

function generateUniqueId(cells: CellType[][]) {
  let maxId = 0;

  for (const row of cells) {
    for (const cell of row) {
      if (cell.id >= maxId) {
        maxId = cell.id;
      }
    }
  }

  return maxId + 1;
}

type Bomb = {
  row: number;
  column: number;
};

function countBombNeighbours(cells: CellType[][]) {
  const newRows: CellType[][] = [];

  for (let row = 0; row < cells.length; row++) {
    const newRow: CellType[] = [];

    for (let column = 0; column < cells[row].length; column++) {
      const newCell: CellType = { ...cells[row][column] };

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
          newCell.bombsAround += 1;
        }
      }

      newRow.push(newCell);
    }

    newRows.push(newRow);
  }

  return newRows;
}

export const generateTable = (rows: number, columns: number, bombsCount: number) => {
  const bombs: Bomb[] = [];

  while (bombs.length !== bombsCount) {
    const bomb: Bomb = {
      row: Math.floor(Math.random() * rows),
      column: Math.floor(Math.random() * columns),
    };

    if (!bombs.some((item) => item.row === bomb.row && item.column === bomb.column)) {
      bombs.push(bomb);
    }
  }

  const newRows: CellType[][] = [];

  for (let i = 0; i < rows; i++) {
    const newRow: CellType[] = [];

    for (let j = 0; j < columns; j++) {
      newRow.push({
        id: generateUniqueId([...newRows, newRow]),
        hasBomb: bombs.some((item) => item.row === i && item.column === j),
        isOpen: false,
        bombsAround: 0,
        row: i,
        column: j,
      });
    }

    newRows.push(newRow);
  }

  return countBombNeighbours(newRows);
};
