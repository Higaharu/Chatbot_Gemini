import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Question from "./Question";
import Answer from "./Answer";

function App() {
  const [question, setQuestion] = useState(""); // ユーザーの質問を保存
  const [answer, setAnswer] = useState(""); // Geminiの回答を保存

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={<Question setQuestion={setQuestion} setAnswer={setAnswer} />}
          />
          <Route
            path="/answer"
            element={<Answer question={question} answer={answer} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
