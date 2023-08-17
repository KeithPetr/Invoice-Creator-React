/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Header({setHistory, setConfirm}) {
  const [darkMode, setDarkMode] = useState(true);

  function toggleDarkMode() {
    const body = document.querySelector("body");
    body.classList.toggle("light-mode");
    setDarkMode((prevState) => !prevState);
  }

  return (
    <header>
      <h1 className="title">Invoice Creator</h1>
      <p className="subheading">Thanks for choosing GoodCorp, LLC</p>
      <button className="dark-mode-btn" onClick={toggleDarkMode}>
        {darkMode ? "Dark Mode" : "Light Mode"}
      </button>
      <div className="action-btns">
        <button className="create-btn" onClick={() => {setConfirm(false); setHistory(false)}}>Create New Invoice</button>
        <button className="view-history-btn" onClick={() => setHistory(true)}>View History</button>
      </div>
    </header>
  );
}
