// import { useState } from "react";
import Header from "../components/Header.jsx";
import TaskList from "../components/TaskList.jsx";

export default function App() {
  // const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="container">
      <Header />
      <TaskList />
    </div>
  );
}
