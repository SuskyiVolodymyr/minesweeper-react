import React from 'react';
import classNames from 'classnames';

import { CellType } from '../../types/CellType';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { tableSlice } from '../../features/tableSlice';
import { gameSlice } from '../../features/gameSlice';
import './Cell.css';
import { fieldProperties } from '../../utils/fieldProperties';
import { addScore } from '../../utils/localStorage';
import { formatTime } from '../../utils/formatTime';
import { countOpenedCells, openCells } from '../../utils/openCells';

type Props = {
  cell: CellType;
};

const COLORS = [
  '#0000FF',
  '#008000',
  '#FF0000',
  '#000080',
  '#800000',
  '#008080',
  '#000000',
  '#808080',
];

enum FontSize {
  Easy = 24,
  Normal = 18,
  Hard = 8,
}

export const Cell = ({ cell }: Props) => {
  const dispatch = useAppDispatch();
  const { gameStatus, difficulty, time } = useAppSelector((state) => state.game);
  const rows = useAppSelector((state) => state.table.rows);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (gameStatus !== 'started') {
      dispatch(gameSlice.actions.setGameStatus('started'));
    }

    dispatch(tableSlice.actions.setFlag(cell));
  };

  const handleLeftClick = () => {
    if (cell.hasBomb) {
      dispatch(tableSlice.actions.openAll());
      dispatch(gameSlice.actions.setGameStatus('lose'));

      return;
    }

    if (gameStatus !== 'started') {
      dispatch(gameSlice.actions.setGameStatus('started'));
    }

    const newTable = openCells(rows, cell);

    dispatch(tableSlice.actions.openCell(newTable));

    const properties = fieldProperties[difficulty];

    if (countOpenedCells(newTable) === properties.totalCells() - properties.bombs) {
      dispatch(gameSlice.actions.setGameStatus('win'));
      addScore(difficulty, formatTime(time));
    }
  };

  if (cell.hasFlag) {
    return (
      <button
        className="table-col"
        onContextMenu={handleRightClick}
        style={{ fontSize: `${FontSize[difficulty] - 4}px` }}
        disabled={gameStatus === 'lose'}
      >
        🚩
      </button>
    );
  }

  if (!cell.isOpen) {
    return (
      <button
        className={classNames('table-col', { button: gameStatus !== 'lose' })}
        onContextMenu={handleRightClick}
        onClick={handleLeftClick}
        disabled={gameStatus === 'lose'}
      />
    );
  }

  if (cell.hasBomb) {
    return (
      <div className="table-col" style={{ fontSize: `${FontSize[difficulty]}px` }}>
        💣
      </div>
    );
  }

  return (
    <div
      className="table-col openCell"
      style={{ color: COLORS[cell.bombsAround + 1], fontSize: `${FontSize[difficulty]}px` }}
    >
      {cell.bombsAround}
    </div>
  );
};
