/* eslint-disable react/prop-types */

export default function Confirm({setConfirm}) {
  return (
    <>
      <p className="confirm-text">Confirm sending invoice?</p>
      <div className="confirm-buttons">
        <button className="return-btn" onClick={() => setConfirm(false)}>Return</button>
        <button className="confirm-btn">Confirm</button>
      </div>
    </>
  );
}
