import React, { useState, useRef, useEffect } from "react";
import "../styles/Copilot.css";
import "../styles/DetailSection.css";
import copilotData from "../copilotData";
import DetailsSection from "./DetailsSection";
const Copilot = ({ copilotMessage, setcopilotMessage ,setMessage,inputRef}) => {
  const [copilotChat, setcopilotChat] = useState([]);
  const chatEndRef = useRef(null);
  const[tab,setTab]=useState(true);
  // Auto scroll effect when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [copilotChat]);

  const handleInputSend = () => {
    if (!copilotMessage.trim()) return;

    const userMessage = { sender: "You", text: copilotMessage };
    const loadingMessage = { sender: "Fin AI Copilot", text: "Typing..." };

    setcopilotChat((prevChat) => [...prevChat, userMessage, loadingMessage]);
    setcopilotMessage("");
    inputRef.current?.focus();

    setTimeout(() => {
      const response =
        copilotData[Math.floor(Math.random() * copilotData.length)];

      setcopilotChat((prevChat) => {
        const updatedChat = prevChat.slice(0, -1);
        return [...updatedChat, { sender: "Fin AI Copilot", text: response }];
      });
    }, 1500);
  };

  return (
    <div className="copilot-section">
      <div className="copilot-header">
        <button className={`header-btn1 ${tab?'active':''} `} onClick={()=>setTab(true)}>AI Copilot</button>
        <button className={`header-btn2 ${tab?'':'active'}`} onClick={()=>setTab(false)}>Details</button>
        </div>
      {tab && (<>
      <div className="copilot-chat">
        {copilotChat.map((chat, index) => (
          <div
            key={index}
            className={`message ${
              chat.sender === "You" ? "user-message" : "copilot-message"
            }`}
          >
            <div className="user-message-header">{chat.sender}</div>
            <div> {chat.text}</div>
            {chat.sender === "Fin AI Copilot" && chat.text !== "Typing..." && (
              <button className="AddToComposer"
              onClick={() => {setMessage(chat.text);
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="composer-icon"
                >
                  <path d="M3 3h18v18H3V3zm14.74 5.34l-1.08-1.08a.5.5 0 0 0-.7 0l-6.52 6.52a.5.5 0 0 0-.13.23l-.61 2.28a.25.25 0 0 0 .31.31l2.28-.61a.5.5 0 0 0 .23-.13l6.52-6.52a.5.5 0 0 0 0-.7z" />
                </svg>
                Add To Composer
              </button>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="copilot-input-wrapper">
        <input
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleInputSend();
            }
          }}
          onChange={(e) => setcopilotMessage(e.target.value)}
          value={copilotMessage}
          type="text"
          className="copilot-input"
          placeholder="Ask a question..."
        />
        <button
          className="copilot-up-btn"
          title="Send"
          onClick={handleInputSend}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 0 24 24"
            width="16"
            fill="currentColor"
          >
            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.59 5.58L20 12l-8-8-8 8z" />
          </svg>
        </button>
      </div>
     </> )}
     {!tab && (
  <>
    <div className="details-section-wrapper">
      <DetailsSection />
    </div>
  </>
)}

    </div>

  );
};

export default Copilot;
