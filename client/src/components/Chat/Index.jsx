import React, { useEffect, useState, useRef } from 'react';

import { useMutation } from "react-query";
import { sendChatMessage } from '../../api/ChatApi';
import axios from "axios";

import styles from './Chat.module.css'

//components
import BotMessage from './BotMessage/Index';
import DataMensage from "./DataMessage/Index";
import MessageContext from './MessageContext/index';
import MessageUser from './MessageUser/Index';

// hooks
import useChatbots from '../../hooks/ChatbotList.jsx'

const Chat = () => {

    const myRef = useRef(null);
    const cancelTokenRef = useRef(axios.CancelToken.source());

    const { chatbots, isLoading: isChatbotsLoading, error } = useChatbots();
    const [ question, setQuestion ] = useState("")
    const [ temp, setTemp ] = useState("")
    const [ listQuestions, setListQuestions ] = useState([])
    const [ selectedChatbotId, setSelectedChatbotId ] = useState(null);
    const [selectedChatbotName, setSelectedChatbotName] = useState("");

    const { mutate: mutateGPT, isLoading: isSendingMessage } = useMutation(
        "response-GPT",
        async ()=> {
            return sendChatMessage(selectedChatbotId, question)
        },
        {
          onSuccess: (res) => {
            const response = res
            setListQuestions([...listQuestions, { question: question, response: response }])
          },
          onError: (error) => { console.log(error) }
        }
    )

    useEffect( () => {
      scrollToEnd()
    }, [listQuestions, question])

    useEffect( () => {
      if(question !== "") {
        setTemp(question)
      }
    }, [question])

    useEffect(() => {
      setListQuestions([]);
      const cancelRequest = () => {
          cancelTokenRef.current.cancel("Cancelando a requisição anterior");
          cancelTokenRef.current = axios.CancelToken.source();
      };
      if (selectedChatbotId) {
          cancelRequest();
      }

      return () => {
          cancelTokenRef.current.cancel("Componente desmontado");
      };
  }, [selectedChatbotId, setListQuestions]);

    function scrollToEnd() {
      if(myRef.current) {
        myRef.current.scrollTo(0, myRef.current.scrollHeight)
      }
    }

    const handleChatbotSelection = (e) => {
      setSelectedChatbotId(e.target.value);

      const chatbot = chatbots.find(bot => bot._id === e.target.value);
      if (chatbot) {
        setSelectedChatbotName(chatbot.botName);
      }
    };
    return (
      <div className={styles.chat}>
        <div className={styles.chatContainer}>
          <p>Teste o chatbot fazendo perguntas baseadas nas informações e arquivos inseridos</p>

          <div className={styles.select}>
          {isChatbotsLoading ? (
                  <p>Carregando chatbots...</p>
              ) : error ? (
                  <p>Erro ao carregar chatbots.</p>
              ) : (
                  <select className={styles.listChatbots}
                    onChange={handleChatbotSelection} value={selectedChatbotId}>
                      <option value="">Selecione um chatbot</option>
                      {chatbots.map((chatbot) => (
                          <option key={chatbot._id} value={chatbot._id}>
                              {chatbot.botName}
                          </option>
                      ))}
                  </select>
              )}
            </div>
            <div className={styles.chat_content} ref={myRef}>
              <DataMensage />
              {listQuestions.map((element, index) => {

                  return (
                      <React.Fragment key={index}>
                          <MessageUser question={element.question} />
                          <BotMessage response={element.response.message} />
                      </React.Fragment>
                  )
              })}
              {isSendingMessage ?
                  <>
                      <MessageUser key="temp User" question={temp} />
                      <BotMessage key="loading bot" loading={true} />
                  </> : false }
            </div>

              <MessageContext question={question} setQuestion={setQuestion} mutateGPT={mutateGPT} />

          </div>
      </div>
  )
}

export default Chat
