import { useState } from "react";
import { createChatbot } from "../../api/ChatApi";
import { AiTwotoneSetting } from "react-icons/ai";

import "./ChatbotForm.css";

function ChatbotForm(props) {

  const [botName, setBotName] = useState("");
  const [botVersion, setBotVersion] = useState("GPT-3.5-turbo");
  const [instructions, setInstructions] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    botName: "",
    instructions: "",
    file: "",
  });
  const [isChatbotCreated, setIsChatbotCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      botName: "",
      instructions: "",
      file: "",
    });

    let hasError = false;

    if (!botName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        botName: "Nome do Chatbot é obrigatório.",
      }));
      hasError = true;
    }

    if (!instructions) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        instructions: "Instruções são obrigatórias.",
      }));
      hasError = true;
    }

    if (!file) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: "Arquivo é obrigatório.",
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }
    const formData = new FormData()
    formData.append("botName", botName);
    formData.append("version", botVersion);
    formData.append("instructions", instructions);
    formData.append("file", file);

    try {
      const data = await createChatbot(formData)

      setIsChatbotCreated(true);
      props.setActiveComponent('chat')

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="chatbot-container">
        <form onSubmit={handleSubmit} className="chatbot-form">
          {errors.allFields && (
            <div className="error-message show-message">{errors.allFields}</div>
          )}
          <div className="row">
            <div className="form-group">
              <label>Nome do Chatbot:</label>
              <input
                type="text"
                id="botName"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="box-field"
                placeholder="Digite o nome do chatbot"
              />
              {errors.botName && (
                <div className="error-message show-message">{errors.botName}</div>
              )}
            </div>
            <div className="form-group">
              <div className="select-container">
                <label>Versão do Chatbot:</label>
                <select
                  id="botVersion"
                  value={botVersion}
                  onChange={(e) => setBotVersion(e.target.value)}
                  className="box-field"
                >
                  <option value="GPT-3.5-turbo">GPT-3.5-turbo</option>
                </select>
                <i className="input-select-icon" />
                <a class="prices-link" target="_blank" href="https://openai.com/pricing"> Verifique os preços aqui </a>
              </div>
            </div>
          </div>

          <div className="label-icon">
            <label>Prompt </label>
            <span class="material-icons">info</span>
          </div>

          <input
            id="instructions"
            placeholder="Digite as instruções de comportamento do chatbot aqui"
            value={instructions}
            rows="4"
            onChange={(e) => setInstructions(e.target.value)}
            className="input-field box-field"
          />
          {errors.instructions && (
            <div className="error-message show-message">
              {errors.instructions}
            </div>
          )}
          <div className="file-field">
            <div className="label-icon">
            <label>Documentos (.txt): </label>
            <span class="material-icons">info</span>
          </div>
            <input
              type="file"
              id="file"
              accept=".txt"
              onChange={(e) => setFile(e.target.files[0])}
            />
            
          </div>

          {errors.file && (
            <div className="error-message show-message">{errors.file}</div>
          )}

          <button className="button-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Criando Chatbot" : "Salvar Chatbot"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default ChatbotForm;
