/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { database } from "../src/firebase";
import {
  onValue,
  ref,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

export default function History() {
  const historyRef = ref(database, "history");
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Set up listener for history data
    const unsubscribe = onValue(historyRef, (snapshot) => {
      const historyValues = snapshot.val() || {};
      setHistoryData(
        Object.keys(historyValues).map((key) => {
          const invoiceData = historyValues[key].invoice || [];
          const invoiceDate = historyValues[key].timestamp;
          const totalAmount = invoiceData.reduce((total, amount) => {
            return total + parseFloat(amount.amount);
          }, 0);
          return {
            id: key,
            tasks: invoiceData.map((task) => task.task),
            amounts: invoiceData.map((amount) => amount.amount),
            total: totalAmount.toFixed(2),
            date: invoiceDate,
          };
        })
      );
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  function removeInvoice(id) {
    remove(ref(database, `history/${id}`));
  }

  return (
    <div className="history-section">
      <h1>Invoice History</h1>
      {historyData.length === 0 ? (
        <h3>- No History to Display -</h3>
      ) : (
        historyData.map((data, index) => {
          console.log("HistoryData:", data);
          return (
            <div key={index} className="invoice">
              <h3>
                Invoice {index + 1}
                <span className="remove" onClick={() => removeInvoice(data.id)}>
                  Remove
                </span>
              </h3>
              <div className="history-titles">
                <h3 className="history-titles-task">Task</h3>
                <h3 className="history-titles-amount">Amount</h3>
              </div>
              <div key={data.id} className="history-list">
                <div className="history-item-name">
                  {data.tasks.map((task, index) => (
                    <p key={index}>{task}</p>
                  ))}
                </div>
                <div className="history-item-amount">
                  {data.amounts.map((amount, index) => (
                    <p key={index}>${parseFloat(amount).toFixed(2)}</p>
                  ))}
                </div>
              </div>
              <h2>Total: ${data.total}</h2>
              <h3>Date: {data.date}</h3>
            </div>
          );
        })
      )}
    </div>
  );
}
