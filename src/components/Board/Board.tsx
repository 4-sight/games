import React, { useMemo } from "react";
import Cell from "./Cell";
import { board } from "#styles/components/board/board.module.scss";
import { Letter } from "../../hooks/useGameState";

interface Props {
  cells: Letter[];
}

const Board: React.FC<Props> = ({ cells }) => {
  const _cells = useMemo(() => Array(30).fill(undefined), []);
  return (
    <div className={board}>
      {_cells.map((_, i) => (
        <Cell
          key={i}
          letter={cells[i]?.value}
          status={cells[i]?.status}
          index={i % 5}
        />
      ))}
    </div>
  );
};

export default Board;
