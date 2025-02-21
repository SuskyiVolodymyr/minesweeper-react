export type CellType = {
  id: number;
  isOpen: boolean;
  hasBomb: boolean;
  bombsAround: number;
  row: number;
  column: number;
};
