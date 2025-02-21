import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { tableSlice } from '../../features/tableSlice';
import { generateTable } from '../../utils/generateTable';
import './Minefield.css';
import { Cell } from '../Cell';

export const Minefield: React.FC = () => {
  const { difficulty } = useAppSelector((state) => state.difficulty);
  const { rows: table } = useAppSelector((state) => state.table);
  const dispatch = useAppDispatch();
  const [rowsCount, setRowsCount] = useState(8);
  const [columnsCount, setColumnCount] = useState(5);
  const [bombsCount, setBombsCount] = useState(5);

  useEffect(() => {
    switch (difficulty) {
      case 'Normal':
        setRowsCount(16);
        setColumnCount(10);
        setBombsCount(20);
        break;
      case 'Easy':
      default:
        setRowsCount(8);
        setColumnCount(5);
        setBombsCount(5);
        break;
    }
  }, [difficulty]);

  useEffect(() => {
    const newTable = generateTable(rowsCount, columnsCount, bombsCount);

    dispatch(tableSlice.actions.set(newTable));
  }, [rowsCount, columnsCount, bombsCount, dispatch]);

  return (
    <div
      className="table"
      style={{
        gridTemplateRows: `repeat(${rowsCount}, 1fr)`,
        gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
      }}
    >
      {table.map((row) => {
        {
          return row.map((cell) => <Cell cell={cell} key={cell.id} />);
        }
      })}
    </div>
  );
};
