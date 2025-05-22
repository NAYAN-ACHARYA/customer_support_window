import React from "react";

const MessageList = ({
  messages,
  setcopilotMessage,
  copilotInputRef,
  chatEndRef,
}) => {
  return (
    <>
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${
              msg.sender === "You" ? "agent" : "customer"
            }`}
            style={{ position: "relative" }}
          >
            {msg.sender !== "You" && (
              <div className="avatar-container">
                <div className="avatar-circle">
                  {msg.sender.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            <div
              className={`message ${
                msg.sender === "You" ? "agent" : "customer"
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "You" && (
              <div className="avatar-container">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="avatar"
                  className="avatar-image"
                />
              </div>
            )}

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
      <div ref={chatEndRef} />
    </>
  );
};

export default MessageList;
