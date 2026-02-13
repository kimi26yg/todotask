import React, { useState } from "react";
import "./UpDown.css";

function UpDown() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(
    () => Math.floor(Math.random() * 100) + 1,
  );

  const handleClick = () => {
    const userNum = parseInt(num);
    if (isNaN(userNum)) {
      setResult("숫자를 입력해주세요!");
      return;
    }

    const nextCount = count + 1;
    setCount(nextCount);

    console.log(`--- ${nextCount}회차 시도 ---`);
    console.log("정답:", correct, "입력:", userNum);

    if (userNum > correct) setResult("DOWN하세요");
    else if (userNum < correct) setResult("UP하세요");
    else setResult(`정답입니다! ${nextCount}번 만에 맞추셨네요!`);
  };

  const handleReset = () => {
    setNum("");
    setResult("");
    setCount(0);
    setCorrect(Math.floor(Math.random() * 100) + 1);
    console.clear();
  };

  return (
    <div className="updown-main">
      <p className="count-display">현재 시도 횟수: {count}회</p>

      {/* 입력창 (단독 배치) */}
      <input
        type="number"
        className="user-input"
        placeholder="숫자 입력 (1~100)"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />

      {/* 버튼 그룹 (입력창 밑에 가로로 배치) */}
      <div className="button-group">
        <button className="submit-btn" onClick={handleClick}>
          제출
        </button>
        <button className="reset-btn" onClick={handleReset}>
          리셋
        </button>
      </div>

      <p id="result" className={result.includes("정답") ? "correct" : ""}>
        {result}
      </p>
    </div>
  );
}

export default UpDown;
