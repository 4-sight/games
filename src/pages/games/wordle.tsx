import React, { useEffect } from "react";

import { useGameState } from "#hooks/useGameState";

import Header from "#components/layout/Header";
import Main from "#components/layout/Main";
import { Board } from "#components/Board";
import { Keyboard } from "#components/Keyboard";
import Message from "#components/Message";
import Modal from "#components/Modal";

import { app } from "#styles/layout/app.module.scss";

interface Props {}

const wordle: React.FC<Props> = ({}) => {
  const [
    {
      currentGuess,
      savedGuesses,
      message,
      keyboardState,
      playState,
      time,
      targetWord,
    },
    { addLetter, backspace, guess, playAgain },
  ] = useGameState();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        backspace();
        return;
      }

      if (e.key === "Enter") {
        guess();
        return;
      }

      if (/^([a-z]|[A-Z])$/g.test(e.key)) {
        addLetter(e.key.toLowerCase());
        return;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [addLetter, backspace, guess]);

  return (
    <div className={app}>
      <Header />
      <Main>
        <Message message={message} />
        <Board cells={[...savedGuesses, ...currentGuess]} />
        <Keyboard keyboardState={keyboardState} />
      </Main>
      <Modal
        {...{
          playState,
          time,
          targetWord,
          playAgain,
        }}
      />
    </div>
  );
};

export default wordle;
