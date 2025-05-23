import React, { useState, useEffect } from "react";

const Sidebar = ({ chatsData, selectedChat, setSelectedChat }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  // On mount and window resize, auto-hide sidebar on mobile width
  useEffect(() => {
    const checkWidth = () => {
      setSidebarVisible(window.innerWidth > 768);
    };
    window.addEventListener("resize", checkWidth);
    checkWidth();
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const getDarkColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 30%)`;
  };

  return (
    <>
      {/* Hamburger toggle button */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarVisible(!isSidebarVisible)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Render sidebar only if visible */}
      {isSidebarVisible && (
        <div className="sidebar">
          <div className="sidebar-header">Your inbox</div>
          <ul className="chat-list">
            {chatsData.map((chat) => (
              <li
                key={chat.id}
                className={`chat-item ${
                  selectedChat.id === chat.id ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedChat(chat);
                  if (window.innerWidth <= 768) {
                    setSidebarVisible(false); // Hide sidebar only on mobile
                  }
                }}
              >
                <div
                  className="chat-avatar"
                  style={{
                    backgroundColor: getDarkColor(chat.name),
                    color: "#fff",
                  }}
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
      )}
    </>
  );
};

export default Sidebar;
