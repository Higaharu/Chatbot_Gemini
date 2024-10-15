import React from "react";
import { useNavigate } from "react-router-dom";

const Answer = ({ question, answer }) => {
  const navigate = useNavigate(); // 画面遷移のためのフック

  return (
    <div className="answer-container">
      <h1>回答画面</h1>
      <div className="answer">
        <strong>回答: </strong> {answer}
      </div>
      <button onClick={() => navigate("/")}>戻る</button> {/* 戻るボタン */}
    </div>
  );
};

export default Answer;
