import styles from './BotMessage.module.css'
import BotMessageLoading from "./BotMessageLoading/Index";

import { AiOutlineWhatsApp } from "react-icons/ai";


const BotMessage = ({ loading, response }) => {


  return (
    <div className={styles.messageContainer}>
      <div className={styles.name}>
        <p>Bot</p>
        <AiOutlineWhatsApp />
      </div>
      <div className={styles.botMessage}>
          <div className={styles.botMessage_content}>
              { loading ? <BotMessageLoading /> : <p className={styles.botMessage_text}>{response}</p>}
          </div>
      </div>
    </div>
  )
}

export default BotMessage
