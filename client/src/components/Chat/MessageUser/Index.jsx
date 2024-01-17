import styles from "./MessageUser.module.css";

import { AiOutlineWhatsApp } from "react-icons/ai";

const MessageUser = ({ question }) => {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.name}>
        <p>Você</p>
        <AiOutlineWhatsApp />
      </div>
      <div>
        <p className={styles.messageUser_text}>{question}</p>
      </div>
  </div>
  )
}

export default MessageUser
