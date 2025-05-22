import React, { useState, useRef } from "react";
import { FaRobot } from "react-icons/fa";

const AIMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowMenu(false), 150);
    setHoveredIndex(null);
  };

  const options = [
    "Rephrase",
    "My Tone Of Voice",
    "More Friendly",
    "More Formal",
    "Fix Grammar and Spelling",
    "Translate...",
  ];

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* AI Icon */}
      <button
        type="button"
        aria-label="AI"
        className="format-btn"
      >
        <FaRobot />
      </button>

      {/* AI Dropdown ABOVE the icon */}
      {showMenu && (
        <div
          style={{
            position: "absolute",
            bottom: "120%", // place above the icon
            left: "0",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            zIndex: 100,
            padding: "8px",
            width: "160px",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {options.map((opt, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => alert(`${opt} feature coming soon!`)}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                borderBottom: index < options.length - 1 ? "1px solid #eee" : "none",
                backgroundColor: hoveredIndex === index ? "#f0f0f0" : "transparent",
                
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIMenu;
