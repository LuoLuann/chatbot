import React, { useState } from 'react';
import ChatbotForm from '../components/ChatForm/ChatbotForm';
import Chat from '../components/Chat/Index';
import Header from '../components/Header/Header';

function Homepage() {

  const [activeComponent, setActiveComponent] = useState('form');

  return (
    <div className="container">
        <Header setActiveComponent={setActiveComponent} activeComponent={activeComponent}/>
        {activeComponent === 'form' && <ChatbotForm setActiveComponent={setActiveComponent} />}
        {activeComponent === 'chat' && <Chat />}
    </div>
  );
}

export default Homepage;
