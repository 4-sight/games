import React from "react";
import { LetterStatus } from "../../hooks/useGameState";

import { key } from "#styles/components/keyboard/key.module.scss";

interface Props {
  letter: string;
  wide?: boolean | undefined;
  status: LetterStatus | undefined;
}

const KeyboardKey: React.FC<Props> = ({ letter, wide, status }) => {
  return (
    <div className={key} data-wide={`${wide}`} data-status={status}>
      {letter}
    </div>
  );
};

export default KeyboardKey;
