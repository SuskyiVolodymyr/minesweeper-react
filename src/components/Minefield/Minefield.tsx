import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { tableSlice } from '../../features/tableSlice';
import { generateTable } from '../../utils/generateTable';
import './Minefield.css';
import { Cell } from '../Cell';
import { gameSlice } from '../../features/gameSlice';

export const Minefield: React.FC = () => {
  const { difficulty, gameStatus } = useAppSelector((state) => state.game);
  const { rows: table, openCells } = useAppSelector((state) => state.table);
  const dispatch = useAppDispatch();
  const [rowsCount, setRowsCount] = useState(8);
  const [columnsCount, setColumnCount] = useState(5);
  const [bombsCount, setBombsCount] = useState(5);

  useEffect(() => {
    if (rowsCount * columnsCount - openCells === bombsCount) {
      dispatch(gameSlice.actions.setGameStatus('win'));
    }
  }, [openCells]);

  useEffect(() => {
    switch (difficulty) {
      case 'Normal':
        setRowsCount(16);
        setColumnCount(10);
        setBombsCount(20);
        break;
      case 'Hard':
        setRowsCount(32);
        setColumnCount(20);
        setBombsCount(100);
        break;
      case 'Easy':
      default:
        setRowsCount(8);
        setColumnCount(5);
        setBombsCount(8);
        break;
    }
  }, [difficulty]);

  useEffect(() => {
    if (gameStatus === 'idle') {
      const newTable = generateTable(rowsCount, columnsCount, bombsCount);

      dispatch(tableSlice.actions.set(newTable));
      dispatch(tableSlice.actions.setBombs(bombsCount));
    }
  }, [rowsCount, columnsCount, bombsCount, dispatch, gameStatus]);

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
