import React, { useRef, useEffect } from "react";
import { FaSmile, FaPaperclip, FaMicrophone } from "react-icons/fa";
import chatResponse from "../chatResponse";

const ChatWindow = ({
  selectedChat,
  message,
  setMessage,
  handleMessageSend,
  setSelectedChat,
  setcopilotMessage,
  copilotInputRef
}) => {
  const textareaRef = useRef(null);
  const chatEndRef = useRef(null);

  const handleTextSend = () => {
    if (!message.trim()) return;
    handleMessageSend();
    setTimeout(() => {
      const newMessage = {
        sender: selectedChat.name,
        text: chatResponse[Math.floor(Math.random() * chatResponse.length)],
      };
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));
    }, 1000);
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [message]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat.messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">{selectedChat.name}</div>
      <div className="chat-messages" style={{ overflowY: "auto", flex: 1 }}>
        {selectedChat.messages && selectedChat.messages.length > 0 ? (
          selectedChat.messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${msg.sender === "You" ? "agent" : "customer"}`}
              style={{ position: "relative" }}
            >
              <div className={`message ${msg.sender === "You" ? "agent" : "customer"}`}>
                {msg.text}
              </div>
          <button
             className="hover-btn"
              onClick={() => {
               setcopilotMessage(msg.text);
              if (copilotInputRef && copilotInputRef.current) {
               copilotInputRef.current.focus();
             }
           }}
>
  Ask Fin Copilot
</button>
            </div>
          ))
        ) : (
          <div className="no-message">No messages yet.</div>
        )}
        {/* Dummy div to scroll into view */}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder="Type a message..."
          value={message}
          rows={1}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleTextSend();
            }
          }}
        />
        <div className="chat-toolbar">
          <div className="chat-icons">
            <FaSmile className="chat-icon" />
            <FaPaperclip className="chat-icon" />
            <FaMicrophone className="chat-icon" />
          </div>
          <button className="send-button" onClick={handleTextSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
