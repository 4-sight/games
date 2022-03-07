import { useCallback, useState } from "react";
import targetWords from "#assets/targetWords.json";
import allowedWords from "#assets/allowedWords.json";

export const letterStatuses = ["not-present", "present", "set"] as const;

export type LetterStatus = typeof letterStatuses[number];

export interface Letter {
  value: string;
  status: LetterStatus | undefined;
}

export type PlayState = "won" | "lost" | "playing";

export interface KeyboardState {
  [key: string]: LetterStatus;
}
export interface Message {
  value: string | undefined;
}

interface GameState {
  time: number;
  message: Message;
  playState: PlayState;
  keyboardState: KeyboardState;
  targetWord: string;
  savedGuesses: Letter[];
  currentGuess: Letter[];
}

interface GameActions {
  addLetter: (letter: string) => void;
  backspace: () => void;
  guess: () => void;
  playAgain: () => void;
}

//=============================================================

const getTargetWord = (): string => {
  const randomIndex = Math.floor(Math.random() * targetWords.targets.length);
  return targetWords.targets[randomIndex];
};

const words = [...targetWords.targets, ...allowedWords.allowed];

//=============================================================

export const useGameState = (): [GameState, GameActions] => {
  const [startTime, setStartTime] = useState(Date.now());
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState<Message>({
    value: undefined,
  });
  const [playState, setPlayState] = useState<PlayState>("playing");
  const [targetWord, setTargetWord] = useState<string>(getTargetWord());

  const [keyboardState, setKeyboardState] = useState<KeyboardState>({});

  const [guesses, setGuesses] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<Letter[]>([]);
  const [savedGuesses, setSavedGuesses] = useState<Letter[]>([]);

  //================================================================================

  const addLetter = useCallback(
    (l: string) => {
      if (playState !== "playing") return;
      if (currentGuess.length >= 5) return;

      setCurrentGuess((p) => {
        return [...p, { value: l, status: undefined }];
      });
    },
    [playState, currentGuess]
  );

  //================================================================================

  const backspace = useCallback(() => {
    if (playState !== "playing") return;

    setCurrentGuess((p) => {
      return p.slice(0, p.length - 1);
    });
  }, [playState, setCurrentGuess]);

  //================================================================================

  const updateLetterStatus = useCallback(
    (letter: string, status: LetterStatus) => {
      if (letter in keyboardState) {
        const currentState = keyboardState[letter];

        if (currentState === status) return;
        if (currentState && ["not-present", "set"].includes(currentState)) {
          return;
        }
      }

      setKeyboardState((_keyboardState) => {
        return { ..._keyboardState, [letter]: status };
      });
    },
    [keyboardState, setKeyboardState]
  );

  //================================================================================

  const addGuessToSaved = useCallback(
    (guess: Letter[]) => {
      setSavedGuesses((_savedGuesses) => {
        return [..._savedGuesses, ...guess];
      });
    },
    [setSavedGuesses]
  );

  //================================================================================

  const handleCorrectGuess = useCallback(() => {
    setTime(Date.now() - startTime);
    setTimeout(() => {
      setPlayState("won");
    }, 2000);
    setMessage({ value: "You won!" });

    const correctGuess = currentGuess.map((cell) => {
      updateLetterStatus(cell.value, "set");
      return { ...cell, status: "set" as const };
    });
    addGuessToSaved(correctGuess);
    setCurrentGuess([]);
    setGuesses((_guesses) => _guesses + 1);
  }, [startTime, currentGuess, addGuessToSaved, updateLetterStatus]);

  //================================================================================

  const handleWordTooShort = useCallback(() => {
    setMessage({ value: "Not enough letters" });
  }, []);

  //================================================================================

  const handleInvalidWord = useCallback(() => {
    setMessage({ value: "Word not recognized" });
  }, []);

  //================================================================================

  const handleValidGuess = useCallback(() => {
    const targetArr = targetWord.split("");
    const partials: { [key: number]: true } = {};
    const nextGuess: Letter[] = currentGuess.map(({ value }, i) => {
      if (value === targetArr[i]) {
        updateLetterStatus(value, "set");
        return { value, status: "set" };
      }

      const partialMatch = targetArr.some((targetL, targetI) => {
        if (
          value === targetL &&
          currentGuess[targetI].value !== targetL &&
          !partials[targetI]
        ) {
          partials[targetI] = true;
          return true;
        }

        return false;
      });

      if (partialMatch) {
        updateLetterStatus(value, "present");
        return { value, status: "present" };
      }

      updateLetterStatus(value, "not-present");
      return { value, status: "not-present" };
    });

    addGuessToSaved(nextGuess);
    setCurrentGuess([]);

    if (guesses >= 5) {
      setTime(Date.now() - startTime);
      setPlayState("lost");
      setMessage({ value: `You lost! answer: ${targetWord}` });
    }
    setGuesses((_guesses) => _guesses + 1);
  }, [
    playState,
    currentGuess,
    targetWord,
    words,
    addGuessToSaved,
    guesses,
    startTime,
    updateLetterStatus,
  ]);

  //================================================================================

  const guess = useCallback(() => {
    if (playState !== "playing") return;
    if (currentGuess.length < 5) return handleWordTooShort();
    const guessWord = currentGuess.reduce(
      (word, cell) => `${word}${cell?.value}`,
      ""
    );
    if (guessWord === targetWord) return handleCorrectGuess();
    if (words.indexOf(guessWord) === -1) return handleInvalidWord();
    return handleValidGuess();
  }, [
    playState,
    currentGuess,
    targetWord,
    words,
    handleWordTooShort,
    handleCorrectGuess,
    handleInvalidWord,
    handleValidGuess,
  ]);

  //================================================================================

  const playAgain = useCallback(() => {
    setPlayState("playing");
    setMessage({ value: undefined });
    setGuesses(0);
    setCurrentGuess([]);
    setSavedGuesses([]);
    setKeyboardState({});
    setTargetWord(getTargetWord());
    setStartTime(Date.now());
    setTime(0);
  }, []);

  //================================================================================

  const state: GameState = {
    time,
    message,
    playState,
    keyboardState,
    targetWord,
    savedGuesses,
    currentGuess,
  };
  const actions: GameActions = {
    addLetter,
    backspace,
    guess,
    playAgain,
  };

  return [state, actions];
};
