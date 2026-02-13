import { useState } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);
  const max = 10;
  const min = -10;
  const addCount = () => {
    setCount(count + 1);
    console.log(count);
  };
  const minusCount = () => {
    setCount(count - 1);
    console.log(count);
  };
  const resetCount = () => {
    setCount((count) => 0);
    console.log(count);
  };

  return (
    <div className="counter">
      <h1
        className={`count ${count > 0 ? "positive" : count < 0 ? "negative" : ""}`}
      >
        {count}
      </h1>
      <div className="buttons">
        <button onClick={minusCount} disabled={count <= min}>
          -
        </button>
        <button onClick={resetCount} disabled={count == 0}>
          Reset
        </button>
        <button onClick={addCount} disabled={count >= max}>
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
