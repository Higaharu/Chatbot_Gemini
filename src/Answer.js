import React from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const Answer = ({ question, answer, responder }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/"); // 質問画面に戻る
  };

  return (
    <div className="answer-container">
      <h1>回答画面</h1>
      <div className="chat-container">
        <div className={`icon ${responder === 'ロボット' ? 'icon-robot' : 'icon-soushi'}`}/>
        <strong>回答:</strong> {answer}
      </div>
      <button onClick={handleBackClick}>戻る</button>
    </div>
  );
};

export default Answer;
