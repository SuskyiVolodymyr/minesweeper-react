class Properties {
  constructor(
    public rows: number,
    public columns: number,
    public bombs: number,
  ) {}

  totalCells() {
    return this.rows * this.columns;
  }
}

type FieldPropertiesType = {
  Easy: Properties;
  Normal: Properties;
  Hard: Properties;
};

export const fieldProperties: FieldPropertiesType = {
  Easy: new Properties(8, 5, 8),
  Normal: new Properties(16, 10, 15),
  Hard: new Properties(32, 20, 100),
};
