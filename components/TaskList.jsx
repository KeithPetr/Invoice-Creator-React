/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import PlusSign from "../images/plus-sign.svg";

export default function TaskList({tasksDB}) {
  const [taskList, setTaskList] = useState([]);
  const taskInputRef = useRef(null);
  const dollarAmountRef = useRef(null);

  // this function creates a task object that contains the task
  // name and the amount. It then adds the object to the taskList 
  // array and spreads in previous objects
  function addTask() {
    const taskObject = {
        task: taskInputRef.current.value,
        amount: dollarAmountRef.current.value
    }
    setTaskList(prevList => {
        return [...prevList, taskObject]
    })
    taskInputRef.current.value = ''
    dollarAmountRef.current.value = ''
  }

  // Use useEffect to push data to Firebase when taskList changes
  useEffect(() => {
    if (taskList.length > 0) {
      push(tasksDB, taskList);
    }
  }, [taskList, tasksDB]);

  console.log(taskList)

  return (
    <section className="task-list">
      <div className="input-section">
        <input className="task-input" type="text" ref={taskInputRef} />
        <input className="dollar-amount" type="number" ref={dollarAmountRef} />
        <button className="plus-sign" onClick={addTask}>
          <img src={PlusSign} alt="plus sign" />
        </button>
      </div>
      <div className="list-headings">
        <p>Task</p>
        <p>Task Price</p>
      </div>
    </section>
  );
}
