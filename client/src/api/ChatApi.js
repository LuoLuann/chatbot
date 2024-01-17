import axiosClient from "./AxiosClient";

export const createChatbot = async (formData) => {
    try {
      const response = await axiosClient.post("/create-chatbot",
        formData,
        {
            timeout: 3000,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
      return response.data;

    } catch (error) {
      console.error("Erro ao criar chatbot:", error);
      throw error;
    }
  };

export const fetchChatbots = async () => {
    try {
        const response = await axiosClient.get('/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendChatMessage = async(chatbotId, message) => {
    try {
        const response = await axiosClient.post(`/chat/${chatbotId}`, {
            message
        })
        return response.data
    } catch (error) {
        console.error('Error ao enviar mensagem: ', error)
        throw error
    }
}
export const getChatHistory = async(chatbotId) => {
    try {
        const res = await axiosClient.get(`/chat/${chatbotId}`)
        return res.data
    } catch (error) {
        console.error('Erro ao buscar histórico do chatbot:', error);
        throw error;
    }
}
