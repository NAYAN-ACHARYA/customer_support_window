import React, { useState } from "react";
import "./App.css";
import "./styles/Sidebar.css";
import "./styles/ChatWindow.css";
import "./styles/Copilot.css";
import chatsData from "./chatsData";
import Sidebar from "./Components/Sidebar";
import ChatWindow from "./Components/ChatWindow";
import Copilot from "./Components/Copilot";

function App() {
  const copilotInputRef = React.useRef(null);
  const[copilotMessage,setcopilotMessage]=useState("");
  const [selectedChat, setSelectedChat] = useState(chatsData[0]);
  const [message, setMessage] = useState("");
  
  const handleMessageSend = () => {
    if (message.trim() !== "") {
      const newMessage = {
        sender: "You",
        text: message,
      };
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));
      setMessage("");
    }
  };

  return (
    <div className="app">
      <Sidebar
        chatsData={chatsData}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
      <ChatWindow
        selectedChat={selectedChat}
        message={message}
        setMessage={setMessage}
        handleMessageSend={handleMessageSend}
        setSelectedChat={setSelectedChat}
        setcopilotMessage={setcopilotMessage}
        copilotInputRef={copilotInputRef}
      />
      <Copilot copilotMessage={copilotMessage}
      inputRef={copilotInputRef}
      setcopilotMessage={setcopilotMessage} 
      setMessage={setMessage}/>
    </div>
  );
}

export default App;
