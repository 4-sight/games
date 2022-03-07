import React from "react";
import { KeyboardState } from "../../hooks/useGameState";

import {
  keyboard,
  row as rowStyles,
} from "#styles/components/keyboard/keyboard.module.scss";
import KeyboardKey from "./Key";

interface Props {
  keyboardState: KeyboardState;
}

const Keyboard: React.FC<Props> = ({ keyboardState }) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ];

  return (
    <div className={keyboard}>
      {rows.map((row, i) => (
        <div className={rowStyles} key={i}>
          {row.map((letter, i) => {
            const wide = ["ENTER", "DEL"].includes(letter);
            return (
              <KeyboardKey
                letter={letter}
                key={i}
                wide={wide}
                status={keyboardState[letter.toLowerCase()]}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
