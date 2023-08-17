/* eslint-disable react/prop-types */
import {
  push,
  ref,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { database } from "../src/firebase";

export default function Confirm({setConfirm, setHistory, total, taskList}) {
  const historyRef = ref(database, "history");

  function addToHistory() {
    if (taskList.length > 0) {
      const timestamp = new Date().toLocaleDateString('en-CA', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })

      push(historyRef, {
        timestamp: timestamp,
        invoice: taskList,
        total: total
      });
      remove(ref(database, "tasks"))
    }
  }


  return (
    <>
      <p className="confirm-text">Confirm sending invoice?</p>
      <div className="confirm-buttons">
        <button className="return-btn" onClick={() => setConfirm(false)}>Return</button>
        <button className="confirm-btn" onClick={() => {setHistory(true); addToHistory()}}>Confirm</button>
      </div>
    </>
  );
}
