import React, { useEffect, useState } from "react";
import {
  FaSmile,
  FaPaperclip,
  FaMicrophone,
  FaBold,
  FaItalic,
  FaRegKeyboard,
  FaRegClipboard,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import AIMenu from "./AImenu";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const ChatInput = ({
  message,
  setMessage,
  handleTextSend,
  isFocused,
  setIsFocused,
}) => {
  const [hasSelection, setHasSelection] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [showCopyMsg, setShowCopyMsg] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: message,
    onUpdate: ({ editor }) => {
      setMessage(editor.getHTML());
      setHasSelection(
        editor.state.selection?.from !== editor.state.selection?.to
      );
    },
    onSelectionUpdate: ({ editor }) => {
      setHasSelection(
        editor.state.selection?.from !== editor.state.selection?.to
      );
    },
  });

  useEffect(() => {
    if (editor && message !== editor.getHTML()) {
      editor.commands.setContent(message);
    }
  }, [message, editor]);

  useEffect(() => {
    if (showCopyMsg) {
      const timeout = setTimeout(() => setShowCopyMsg(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showCopyMsg]);

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();

  const copyToClipboard = () => {
    if (editor) {
      const plainText = editor.state.doc.textContent;
      navigator.clipboard
        .writeText(plainText)
        .then(() => {
          setCopyMessage("Copied to clipboard!");
          setShowCopyMsg(true);
        })
        .catch(() => {
          setCopyMessage("Failed to copy!");
          setShowCopyMsg(true);
        });
    }
  };

  const isEditorEmpty =
    message.trim() === "" || message === "<p></p>" || editor?.isEmpty;

  return (
    <div className="chat-input-container" style={{ position: "relative" }}>
      {/* Floating formatting toolbar */}
      {isFocused && (
        <div
          className="floating-box formatting-toolbar"
          onMouseDown={(e) => e.preventDefault()}
          style={{
            position: "absolute",
            bottom: "100%",
            left: "10px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "6px",
            display: "flex",
            gap: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          {!isEditorEmpty && hasSelection ? (
            <>
              <AIMenu />

              <button
                onClick={toggleBold}
                type="button"
                aria-label="Bold"
                className="format-btn"
              >
                <FaBold />
              </button>

              <button
                onClick={toggleItalic}
                type="button"
                aria-label="Italic"
                className="format-btn"
              >
                <FaItalic />
              </button>

              <button
                onClick={copyToClipboard}
                type="button"
                aria-label="Copy to Clipboard"
                className="format-btn"
              >
                <FaRegClipboard />
              </button>
            </>
          ) : (
            <>
              <FaRegKeyboard
                title="Type something..."
                style={{ fontSize: "18px", color: "#888" }}
              />
              <span style={{ fontSize: "14px", color: "#888" }}>
                {isEditorEmpty
                  ? "Start typing to enable formatting"
                  : "Select text to format"}
              </span>
            </>
          )}

          {showCopyMsg && <div>{copyMessage}</div>}
        </div>
      )}

      {/* Editor input */}
      <div
        className="chat-input"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const plainText = editor.getText();
            if (plainText.trim() !== "") {
              handleTextSend(plainText);
            }
            editor.commands.clearContent();
            setMessage("");
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        style={{
          position: "relative",
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >
        {isEditorEmpty && (
          <div
            style={{
              position: "absolute",
              color: "grey",
              padding: "8px",
              pointerEvents: "none",
            }}
          >
            Start typing...
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      {/* Chat toolbar */}
      <div className="chat-toolbar" style={{ marginTop: "8px" }}>
        <div className="chat-icons" style={{ display: "flex", gap: "12px" }}>
          <FaSmile
            className="chat-icon"
            onClick={() => window.alert(`feature yet to come`)}
          />
          <FaPaperclip
            className="chat-icon"
            onClick={() => window.alert(`feature yet to come`)}
          />
          <FaMicrophone
            className="chat-icon"
            onClick={() => window.alert(`feature yet to come`)}
          />
        </div>

        <button
          className="send-button"
          onClick={() => {
            const plainText = editor.getText();
            if (plainText.trim() !== "") {
              handleTextSend(plainText);
            }
            editor.commands.clearContent();
            setMessage("");
          }}
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Send <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
