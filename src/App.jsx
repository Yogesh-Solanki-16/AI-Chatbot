import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { IoMdSend } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import axios from "axios";
import grey from "./assets/grey.png";

const App = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const chatContainerRef = useRef(null);

  const generateAnswer = async () => {
    if (input.trim() === "") return;

    const newMessage = { user: "user", text: input };
    setChatHistory((prev) => [...prev, newMessage]);
    setInput("");

    const loadingMessage = { user: "bot", text: "Loading your answer..." };
    setChatHistory((prev) => [...prev, loadingMessage]);

    try {
      const response = await axios.post(
       "Enter API Key",
        {
          contents: [{ parts: [{ text: input }] }],
        }
      );
      const result = response.data.candidates[0].content.parts[0].text;
      const botMessage = { user: "bot", text: result };
      setChatHistory((prev) => [...prev.slice(0, -1), botMessage]);
    } catch (error) {
      const errorMessage = {
        user: "bot",
        text: "Something went wrong. Please try again.",
      };
      setChatHistory((prev) => [...prev.slice(0, -1), errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") generateAnswer();
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <img src={grey} alt="Logo" />
          <span>ChatWithBadshah</span>
        </div>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? <BsSun /> : <BsMoon />}
          </button>
          <button className="login">Log in</button>
        </div>
      </header>

      <main className="main-content" ref={chatContainerRef}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={message.user === "user" ? "message-user" : "message-bot"}
          >
            {message.user === "user" ? (
              <>
                <p className="user-msg">{message.text}</p>
                <FaUserCircle className="user-logo" />
              </>
            ) : (
              <>
                <p className="subtitle">{message.text}</p>
                <img className="logo2" src={grey} alt="Avatar" />
              </>
            )}
          </div>
        ))}
      </main>

      <footer className="footer">
        <div className="input-group input-section">
          <input
            type="text"
            className="input-field"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="btn-send" onClick={generateAnswer}>
            <IoMdSend />
          </button>
        </div>
        <p className="copyright">© 2025 Yogesh Solanki. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
