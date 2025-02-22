import React, { useMemo } from 'react';
import classNames from 'classnames';

import { CellType } from '../../types/CellType';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { tableSlice } from '../../features/tableSlice';
import { gameSlice } from '../../features/gameSlice';
import './Cell.css';

type Props = {
  cell: CellType;
};

const colors = [
  '#0000FF',
  '#008000',
  '#FF0000',
  '#000080',
  '#800000',
  '#008080',
  '#000000',
  '#808080',
];

export const Cell: React.FC<Props> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const { gameStatus, difficulty } = useAppSelector((state) => state.game);
  const fontSize = useMemo(() => {
    switch (difficulty) {
      case 'Easy':
        return 24;
      case 'Normal':
        return 18;
      case 'Hard':
        return 8;
      default:
        return 24;
    }
  }, [difficulty]);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (gameStatus === 'lose') {
      return;
    }

    if (gameStatus !== 'started') {
      dispatch(gameSlice.actions.setGameStatus('started'));
    }

    if (cell.hasFlag) {
      dispatch(tableSlice.actions.increaseBombs());
    } else {
      dispatch(tableSlice.actions.decreaseBombs());
    }

    dispatch(tableSlice.actions.setFlag(cell));
  };

  if (cell.hasFlag) {
    return (
      <button
        className="table-col"
        onContextMenu={handleRightClick}
        style={{ fontSize: `${fontSize - 4}px` }}
      >
        🚩
      </button>
    );
  }

  const handleLeftClick = () => {
    if (cell.hasBomb) {
      dispatch(tableSlice.actions.openAll());
      dispatch(gameSlice.actions.setGameStatus('lose'));

      return;
    }

    if (gameStatus !== 'started') {
      dispatch(gameSlice.actions.setGameStatus('started'));
    }

    dispatch(tableSlice.actions.openCell(cell));
  };

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
      <div className="table-col" style={{ fontSize: `${fontSize}px` }}>
        💣
      </div>
    );
  }

  return (
    <div
      className="table-col openCell"
      style={{ color: colors[cell.bombsAround + 1], fontSize: `${fontSize}px` }}
    >
      {cell.bombsAround}
    </div>
  );
};
