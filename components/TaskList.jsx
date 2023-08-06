/* eslint-disable react/prop-types */
import { database } from "../src/firebase";
import { useState, useRef, useEffect } from "react";
import {
  onValue,
  push,
  ref,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

export default function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const taskInputRef = useRef(null);
  const dollarAmountRef = useRef(null);
  const [total, setTotal] = useState([]);
  const tasksDB = ref(database, "tasks");
  const [roundedValue, setRoundedValue] = useState("");
  const [taskName, setTaskName] = useState("")

  // this function creates a task object that contains the task
  // name and the amount. It then adds the object to the taskList
  // array and spreads in previous objects
  function addTask() {
    const taskObject = {
      task: taskName,
      amount: roundedValue,
    };

    push(tasksDB, taskObject);

    setTaskName("")
    setRoundedValue("");
  }

  // this function looks through the child objects of the
  // database for the specific id being brought in as a
  // parameter and then removes it
  function removeTask(id) {
    remove(ref(database, `tasks/${id}`));
  }

  function handleDollarAmountChange(event) {
    const inputValue = event.target.value;
  
    // Use a regular expression to ensure that the input is a valid number with up to 2 decimal places
    const validNumber = /^\d+(\.\d{0,2})?$/.test(inputValue);
  
    if (validNumber || inputValue === "") { // Allow empty input
      setRoundedValue(inputValue);
    }
  }
  

  function handleTaskNameChange(event) {
    const inputName = event.target.value;

    setTaskName(inputName);
  }

  const taskListNames = taskList.map((item) => (
    <div key={item.id} className="task-list-names">
      <p>{item.task}</p>
      <p className="remove" onClick={() => removeTask(item.id)}>
        Remove
      </p>
    </div>
  ));

  const taskListAmounts = taskList.map((item) => {
    const formattedNumber = parseFloat(item.amount).toFixed(2)

    return <p key={item.id}>${formattedNumber}</p>;
  });

  useEffect(() => {
    // Set up the listener when the component mounts
    const unsubscribe = onValue(tasksDB, (snapshot) => {
      const itemsObject = snapshot.val();
      console.log(snapshot.val());

      if (snapshot.exists()) {
        const itemsArray = Object.keys(itemsObject).map((key) => {
          return {
            id: key,
            task: itemsObject[key].task,
            amount: itemsObject[key].amount,
          };
        });
        setTaskList(itemsArray);
      } else {
        setTaskList([]);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Calculate the total amount
    const newTotal = taskList.reduce(
      (acc, item) => acc + parseFloat(item.amount), 0);
    setTotal(newTotal.toFixed(2));
  }, [taskList]); // Run this effect whenever taskList changes

  console.log("taskList", taskList);
  console.log("total:", total);

  return (
    <section className="task-list">
      <div className="input-section">
        <input 
          className="task-input" 
          type="text" 
          ref={taskInputRef}
          onChange={handleTaskNameChange}
          value={taskName}
          />
        <input
          className="dollar-amount"
          type="text"
          ref={dollarAmountRef}
          onChange={handleDollarAmountChange}
          value={roundedValue}
        />
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
        </div>
      </div>
      <div className="total">
        <div className="total-headings">
          <p>Notes</p>
          <p>Total Amount</p>
        </div>
        <div className="total-details">
          <p>We accept cash, credit, or PayPal</p>
          <div>${total}</div>
        </div>
        <button className="send-btn">Send Invoice</button>
      </div>
    </section>
  );
}
