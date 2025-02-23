export type CellType = {
  id: number;
  hasBomb: boolean;
  row: number;
  column: number;
  hasFlag: boolean;
  bombsAround: number;
  isOpen: boolean;
};
