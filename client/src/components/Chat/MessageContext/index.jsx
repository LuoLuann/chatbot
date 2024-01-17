import { useState } from "react";
import styles from "./MessageContext.module.css";
import submit from "./correspondencia-enviada.png";


const MessageContext = ({ question, setQuestion, mutateGPT }) => {
  const handlerClick = () => {
    mutateGPT();
    setQuestion("");
  };

  const keyHandler = (event) => {
    if (event.key === "Enter") {
      handlerClick();
    }
  };

  return (
    <div className={styles.messageContext}>
      <input
        className={styles.messageContext_input}
        type="text"
        placeholder="Type Message..."
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        onKeyUp={(e) => keyHandler(e)}
      />
      <button className={styles.messageContext_submit} onClick={() => handlerClick()}>
        <img src={submit} alt="submit" />
      </button>
    </div>
  );
};

export default MessageContext;
