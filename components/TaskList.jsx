/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import {
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

export default function TaskList({ tasksDB }) {
  const [taskList, setTaskList] = useState([]);
  const taskInputRef = useRef(null);
  const dollarAmountRef = useRef(null);
  const [total, setTotal] = useState([]);

  // this function creates a task object that contains the task
  // name and the amount. It then adds the object to the taskList
  // array and spreads in previous objects
  function addTask() {
    const taskName = taskInputRef.current.value;
    const amountValue = dollarAmountRef.current.value;

    const taskObject = {
      task: taskName,
      amount: amountValue,
    };

    push(tasksDB, taskObject);

    taskInputRef.current.value = "";
    dollarAmountRef.current.value = "";
  }

  useEffect(() => {
    // Set up the listener when the component mounts
    const unsubscribe = onValue(tasksDB, (snapshot) => {
      const itemsObject = snapshot.val();

      if (itemsObject) {
        const itemsArray = Object.keys(itemsObject).map((key) => {
          return {
            id: key,
            task: itemsObject[key].task,
            amount: itemsObject[key].amount,
          };
        });
        setTaskList(itemsArray);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [tasksDB]);

  const taskListNames = taskList.map((item) => (
    <div key={item.task} className="task-list-names">
      <p>{item.task}</p>
      <p className="remove">Remove</p>
    </div>
  ));

  const taskListAmounts = taskList.map((item) => {
    return <p key={item.task}>{item.amount}</p>;
  });

  useEffect(() => {
    // Calculate the total amount
    const newTotal = taskList.reduce(
      (acc, item) => acc + parseFloat(item.amount),
      0
    );
    setTotal(newTotal);
  }, [taskList]); // Run this effect whenever taskList changes

  console.log("taskList", taskList);
  console.log("total:", total);

  return (
    <section className="task-list">
      <div className="input-section">
        <input className="task-input" type="text" ref={taskInputRef} />
        <input className="dollar-amount" type="number" ref={dollarAmountRef} />
        <button className="plus-sign" onClick={addTask}></button>
      </div>
      <div className="list-headings">
        <div className="item-names">
          <h2>Task</h2>
          {taskListNames}
        </div>
        <div className="item-prices">
          <h2>Task Price</h2>
          {taskListAmounts}
          <div></div>
        </div>
      </div>
      <div className="total">
        <div className="total-headings">
          <p>Notes</p>
          <p>Total Amount</p>
        </div>
        <div className="total-details">
            <p>We accept cash, credit, or PayPal</p>
            <div>{total}</div>
        </div>
      </div>
    </section>
  );
}
