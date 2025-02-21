import React, { useState } from 'react';
import { CellType } from '../../types/CellType';
import { useAppDispatch } from '../../app/hooks';
import { tableSlice } from '../../features/tableSlice';

type Props = {
  cell: CellType;
};

export const Cell: React.FC<Props> = ({ cell }) => {
  const [hasFlag, setHasFlag] = useState(false);
  const dispatch = useAppDispatch();

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setHasFlag((prev) => !prev);
  };

  if (hasFlag) {
    return (
      <div className="table-col" onContextMenu={handleRightClick}>
        🚩
      </div>
    );
  }

  const handleLeftClick = () => {
    dispatch(tableSlice.actions.openCell(cell));
  };

  if (!cell.isOpen) {
    return <div className="table-col" onContextMenu={handleRightClick} onClick={handleLeftClick} />;
  }

  return <div className="table-col">{cell.hasBomb ? '💣' : cell.bombsAround}</div>;
};
