import React from "react";

const CopilotInput = ({
  inputRef,
  copilotMessage,
  setCopilotMessage,
  handleInputSend,
}) => {
  return (
    <div className="copilot-input-wrapper">
      <input
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleInputSend();
          }
        }}
        onChange={(e) => setCopilotMessage(e.target.value)}
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
  );
};

export default CopilotInput;
