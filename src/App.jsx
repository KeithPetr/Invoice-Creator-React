// import { useState } from "react";
import Header from "../components/Header.jsx";
import TaskList from "../components/TaskList.jsx";
import { useState } from "react";

export default function App() {
  const [history, setHistory] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="container">
      <Header 
      history={history} 
      setHistory={setHistory}
      confirm={confirm}
      setConfirm={setConfirm}
      />
      <TaskList 
      history={history} 
      setHistory={setHistory}
      confirm={confirm}
      setConfirm={setConfirm}
      />
    </div>
  );
}
