export class Cell {
  static lastId = 0;

  id = 0;

  constructor(
    public hasBomb: boolean,
    public row: number,
    public column: number,
    public hasFlag = false,
    public bombsAround = 0,
    public isOpen = false,
  ) {
    this.id = Cell.lastId + 1;
    Cell.lastId = this.id;
  }
}
