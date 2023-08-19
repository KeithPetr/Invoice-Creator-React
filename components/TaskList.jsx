/* eslint-disable react/prop-types */
import Confirm from "./Confirm";
import History from "./History";
import PlusSign from "../images/plus-sign.svg"
import { database } from "../src/firebase";
import { useState, useRef, useEffect } from "react";
import {
  onValue,
  push,
  ref,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

export default function TaskList({ history, setHistory, confirm, setConfirm }) {
  const tasksDB = ref(database, "tasks");
  const taskInputRef = useRef(null);
  const dollarAmountRef = useRef(null);
  const [taskList, setTaskList] = useState([]);
  const [total, setTotal] = useState([]);
  const [roundedValue, setRoundedValue] = useState("");
  const [taskName, setTaskName] = useState("");
  const [isPlusSignHovered, setIsPlusSignHovered] = useState(false);

  // this function creates a task object that contains the task
  // name and the amount. It then adds the object to the taskList
  // array and spreads in previous objects
  function addTask() {
    const taskNameValue = taskName.trim();
    const roundedValueValue = roundedValue.trim();

    if (!taskNameValue || !roundedValueValue) {
      alert("Both fields must have a value.");
      return;
    }

    const taskObject = {
      task: taskName,
      amount: roundedValue,
    };

    const taskExists = taskList.some(
      (item) => item.task.toLowerCase() == taskName.toLowerCase()
    );

    if (taskExists) {
      alert("Task already exists!");
    } else {
      push(tasksDB, taskObject);
    }
    setTaskName("");
    setRoundedValue("");
    taskInputRef.current.focus();
  }

  // this function looks through the child objects of the
  // database for the specific id being brought in as a
  // parameter and then removes it
  function removeTask(id) {
    if (confirm) {
      return;
    }
    remove(ref(database, `tasks/${id}`));
  }

  function handleDollarAmountChange(event) {
    const inputValue = event.target.value;

    // Use a regular expression to ensure that the input is a valid number with up to 2 decimal places
    const validNumber = /^\d+(\.\d{0,2})?$/.test(inputValue);

    if (validNumber || inputValue === "") {
      setRoundedValue(inputValue);
    }
  }

  function handleTaskNameChange(event) {
    const inputName = event.target.value;

    // Prevent input of numeric characters
    if (!/\d/.test(inputName)) {
      setTaskName(inputName);
    }
  }

  const taskListNames = taskList.map((item) => (
    <div key={item.id} className="task-list-names">
      <p>{item.task}</p>
      <span className="remove" onClick={() => removeTask(item.id)}>
        Remove
      </span>
    </div>
  ));

  const taskListAmounts = taskList.map((item) => {
    const formattedNumber = parseFloat(item.amount).toFixed(2);

    return (
      <p key={item.id} className="task-list-amount">
        ${formattedNumber}
      </p>
    );
  });

  const plusSignStyle = {
    height: "30px",
    padding: "1em",
    background: `url(${PlusSign}) center no-repeat`,
    backgroundSize: "60%",
    maxWidth: "30px",
    cursor: "pointer",
    backgroundColor: "var(--primary-color)",
    borderRadius: "50%",
    border: isPlusSignHovered ? "solid #eeeeee 1px" : "none",
  };

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
    const newTotal = taskList.reduce((acc, item) => {
      const amount = parseFloat(item.amount);
      return isNaN(amount) ? acc + 0 : acc + amount;
    }, 0);
    setTotal(newTotal.toFixed(2));
  }, [taskList]); // Run this effect whenever taskList changes

  console.log("taskList", taskList);
  console.log("total:", total);

  return history ? (
    <History />
  ) : (
    <section className="task-list">
      <div className="input-section">
        {!confirm && (
          <>
            <input
              className="task-input"
              type="text"
              ref={taskInputRef}
              onChange={handleTaskNameChange}
              value={taskName}
              placeholder="Task "
            />
            <input
              className="dollar-amount"
              type="text"
              ref={dollarAmountRef}
              onChange={handleDollarAmountChange}
              value={roundedValue}
              placeholder="Price"
            />
            <button
              className="plus-sign"
              onClick={addTask}
              style={plusSignStyle}
              onMouseEnter={() => setIsPlusSignHovered(true)}
              onMouseLeave={() => setIsPlusSignHovered(false)}
            ></button>
          </>
        )}
      </div>
      <div className="list-wrapper">
        <div className="list-headings">
          <h2>Task</h2>
          <h2>Task Price</h2>
        </div>
        <div className="item-wrapper">
          <div className="item-names">{taskListNames}</div>
          <div className="item-prices">{taskListAmounts}</div>
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
        {confirm ? (
          <Confirm
            setConfirm={setConfirm}
            setHistory={setHistory}
            taskList={taskList}
            total={total}
          />
        ) : (
          <button
            className="send-btn"
            onClick={() => setConfirm(true)}
            disabled={taskList.length === 0}
          >
            Send Invoice
          </button>
        )}
      </div>
    </section>
  );
}
