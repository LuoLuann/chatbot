import styles from './BotMessageLoading.module.css'

const BotMessageLoading = () => {
  return (
    <div className={styles.messageBotLoading}>
        <span className={styles.botMessageLoading_span}></span>
        <span className={styles.botMessageLoading_span}></span>
        <span className={styles.botMessageLoading_span}></span>
    </div>
  )
}

export default BotMessageLoading
