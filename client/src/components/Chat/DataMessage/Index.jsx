import React, { useState } from 'react'
import styles from "./DataMessage.module.css";


const DataMensage = () => {

  const [ currentDate, setCurrentDate ] = useState(new Date())

  return (
    <div className={styles.dataMensage}>
    - - - - - - - - - - - - - - - - - - - - - - - - - - -  {currentDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric', })}  - - - - - - - - - - - - - - - - - - - - - - - - - - -
  </div>
  )
}

export default DataMensage
