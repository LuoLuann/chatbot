import { useState, useEffect } from 'react';
import { fetchChatbots } from '../api/ChatApi';

const useChatbots = () => {
    const [chatbots, setChatbots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getChatbots = async () => {
            try {
                const data = await fetchChatbots();
                setChatbots(data.chatbots);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        getChatbots();
    }, []);

    return { chatbots, isLoading, error };
};

export default useChatbots;
