import React from "react";

const CopilotChat = ({ copilotChat, setMessage, chatEndRef }) => {
  return (
    <div className="copilot-chat">
      {copilotChat.map((chat, index) => (
        <div
          key={index}
          className={`message ${
            chat.sender === "You" ? "user-message" : "copilot-message"
          }`}
        >
          <div className="user-message-header">{chat.sender}</div>
          <div>{chat.text}</div>
          {chat.sender === "Fin AI Copilot" && chat.text !== "Typing..." && (
            <button
              className="AddToComposer"
              onClick={() => setMessage(chat.text)}
            >
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
  );
};

export default CopilotChat;
