import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { IoMdSend } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import axios from "axios";
import grey from "./assets/grey.png";

const App = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const generateAnswer = async () => {
    if (input.trim() === "") return;

    const newQuestion = input;
    setQuestion(newQuestion);
    setAnswer("Loading your answer...");
    setInput("");

    try {
      const response = await axios.post(
        "Enter API Key",
        {
          contents: [{ parts: [{ text: input }] }],
        }
      );
      const result = response.data.candidates[0].content.parts[0].text;
      setAnswer(result);
    } catch (error) {
      const errorMessage = "Something went wrong. Please try again.";
      setAnswer(errorMessage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") generateAnswer();
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

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

      <main className="main-content">
        {question && (
          <div className="message-user">
            <p className="user-msg">{question}</p>
            <FaUserCircle className="user-logo" />
          </div>
        )}
        {answer && (
          <div className="answer-field">
            <p className="subtitle">{answer}</p>
            <img className="logo2" src={grey} alt="Avatar" />
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="input-group">
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
