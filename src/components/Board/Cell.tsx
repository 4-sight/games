import React from "react";
import { LetterStatus } from "../../hooks/useGameState";
import { cell } from "#styles/components/board/cell.module.scss";

interface Props {
  letter?: string;
  status?: LetterStatus;
  index: number;
}

const Cell: React.FC<Props> = ({ letter, status, index }) => {
  return (
    <div
      className={cell}
      data-status={status}
      data-highlight={!!letter}
      data-bounce={!!letter}
      style={{
        ["--delay" as any]: `${index * 0.2}s`,
      }}
    >
      {letter || null}
    </div>
  );
};

export default Cell;
