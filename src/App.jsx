// import { useState } from "react";
import Header from "../components/Header.jsx";
import TaskList from "../components/TaskList.jsx";
import { tasksDB } from "./firebase.js"

export default function App() {
  // const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="container">
      <Header />
      <TaskList tasksDB={tasksDB}/>
    </div>
  );
}
