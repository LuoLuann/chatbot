
import ChatbotForm from "./components/ChatForm/ChatbotForm";
import Chat from "./components/Chat/Index"
import HomePage from "./pages/HomePage";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <HomePage />
          } />

          <Route path="/create-bot" element={
            <ChatbotForm />
          } />
        </Routes>
      </BrowserRouter>
  );
}

export default App
