import React, { useEffect, useState } from "react";
import { Message as TMessage } from "../hooks/useGameState";
import { message as messageStyles } from "#styles/components/message.module.scss";

interface Props {
  message: TMessage;
}

const Message: React.FC<Props> = ({ message }) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    if (message.value) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 1500);
    }
  }, [message]);

  return (
    <div className={messageStyles} data-show-message={showMessage}>
      {message.value}
    </div>
  );
};

export default Message;
