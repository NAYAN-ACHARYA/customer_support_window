import React, { useState, useRef, useEffect } from "react";
import "../styles/Copilot.css";
import "../styles/DetailSection.css";
import copilotData from "../copilotData";
import DetailsSection from "./DetailsSection";
import CopilotInput from "./CopilotInput";
import CopilotChat from "./CopilotChat";
const Copilot = ({ copilotMessage, setcopilotMessage, setMessage, inputRef }) => {
  const [copilotChat, setcopilotChat] = useState([]);
  const chatEndRef = useRef(null);
  const [tab, setTab] = useState(true);

  // Auto scroll to bottom when chat updates
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
      const response = copilotData[Math.floor(Math.random() * copilotData.length)];

      setcopilotChat((prevChat) => {
        const updatedChat = prevChat.slice(0, -1); // Remove "Typing..."
        return [...updatedChat, { sender: "Fin AI Copilot", text: response }];
      });
    }, 1500);
  };

  return (
    <div className="copilot-section">
      <div className="copilot-header">
        <button
          className={`header-btn1 ${tab ? "active" : ""}`}
          onClick={() => setTab(true)}
        >
          AI Copilot
        </button>
        <button
          className={`header-btn2 ${tab ? "" : "active"}`}
          onClick={() => setTab(false)}
        >
          Details
        </button>
      </div>

      {tab ? (
        <>
          <CopilotChat
            copilotChat={copilotChat}
            setMessage={setMessage}
            chatEndRef={chatEndRef}
          />

          <CopilotInput
            inputRef={inputRef}
            copilotMessage={copilotMessage}
            setCopilotMessage={setcopilotMessage}
            handleInputSend={handleInputSend}
          />
        </>
      ) : (
        <div className="details-section-wrapper">
          <DetailsSection />
        </div>
      )}
    </div>
  );
};

export default Copilot;
