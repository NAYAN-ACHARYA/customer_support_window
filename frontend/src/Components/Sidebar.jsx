import React from "react";

const Sidebar = ({ chatsData, selectedChat, setSelectedChat }) => {
    const getDarkColor = (str) => {
  // Generate a hash from the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to an HSL dark color
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 30%)`; // Dark, saturated
};

  return (
    <div className="sidebar">
      <div className="sidebar-header">Your inbox</div>
      <ul className="chat-list">
        {chatsData.map((chat) => (
          <li
  key={chat.id}
  className={`chat-item ${selectedChat.id === chat.id ? "active" : ""}`}
  onClick={() => setSelectedChat(chat)}
>
  <div
  className="chat-avatar"
  style={{ backgroundColor: getDarkColor(chat.name), color: "#fff" }}
>
  {chat.name.charAt(0).toUpperCase()}
</div>

  <div className="chat-info">
    <div className="chat-name">{chat.name}</div>
    <div className="chat-preview">{chat.preview}</div>
  </div>
  <div className="chat-time">{chat.time}</div>
</li>

        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
