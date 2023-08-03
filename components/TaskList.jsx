/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import {
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import PlusSign from "../images/plus-sign.svg";

export default function TaskList({ tasksDB }) {
  const [taskList, setTaskList] = useState([]);
  const taskInputRef = useRef(null);
  const dollarAmountRef = useRef(null);

  // this function creates a task object that contains the task
  // name and the amount. It then adds the object to the taskList
  // array and spreads in previous objects
  function addTask() {
    const inputValue = taskInputRef.current.value;

    push(tasksDB, inputValue);

    taskInputRef.current.value = "";
    dollarAmountRef.current.value = "";
  }

  useEffect(() => {
    // Set up the listener when the component mounts
    const unsubscribe = onValue(tasksDB, (snapshot) => {
      const itemsArray = Object.values(snapshot.val());
      setTaskList(itemsArray);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [tasksDB]);

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
        <div className="item-names">
          <p>Task</p>
          {taskList.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className="item-prices">
          <p>Task Price</p>
          <div></div>
        </div>
      </div>
    </section>
  );
}
