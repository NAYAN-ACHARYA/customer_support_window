// ChatInput.jsx
import React from "react";
import { FaSmile, FaPaperclip, FaMicrophone } from "react-icons/fa";

const ChatInput = ({
  message,
  setMessage,
  handleTextSend,
  isFocused,
  setIsFocused,
  textareaRef,
}) => {
  return (
    <div className="chat-input-container">
      {isFocused && message.trim() !== "" && (
        <div className="floating-box">
          <p>This is the floating box</p>
        </div>
      )}

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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
  );
};

export default ChatInput;
