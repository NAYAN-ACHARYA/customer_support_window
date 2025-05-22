import React, { useRef, useEffect, useState } from "react";
import chatResponse from "../chatResponse";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

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
  const [isFocused, setIsFocused] = useState(false);

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

  // Auto-resize textarea (if you want to keep it, but with TipTap it's mostly managed)
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
        <MessageList
          messages={selectedChat.messages}
          setcopilotMessage={setcopilotMessage}
          copilotInputRef={copilotInputRef}
          chatEndRef={chatEndRef}
        />
      </div>

      <div className="chat-input-area">
        <ChatInput
          message={message}
          setMessage={setMessage}
          handleTextSend={handleTextSend}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          textareaRef={textareaRef}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
