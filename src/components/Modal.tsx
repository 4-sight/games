import React from "react";
import { PlayState } from "../hooks/useGameState";
import {
  modal,
  modalBackground,
  playAgainButton,
} from "#styles/components/modal.module.scss";

interface Props {
  targetWord: string;
  playAgain: () => void;
  playState: PlayState;
  time: number;
}

const loseMessage = "You lose!";
const winMessage = "You win!";

const convertTime = (time: number): string => {
  const totalSeconds = Math.round(time / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

const Modal: React.FC<Props> = ({ playAgain, playState, time, targetWord }) => {
  if (playState === "playing") {
    return null;
  }

  return (
    <div className={modalBackground}>
      <div className={modal}>
        <h2>{playState === "won" ? winMessage : loseMessage}</h2>
        <p>{targetWord.toUpperCase()}</p>
        <p>Time: {convertTime(time)}</p>
        <button className={playAgainButton} onClick={playAgain}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
