// import React from "react";
// import './Chatbot';
// import Chatbot from "./Chatbot";

// function App() {
//   return (
//     <div className="App">
//       <h1>Geminino Chatbot</h1>
//       <Chatbot />
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Question from "./Question";
import Answer from "./Answer";

function App() {
  const [question, setQuestion] = useState(""); // ユーザーの質問を保存
  const [answer, setAnswer] = useState(""); // Geminiの回答を保存

  return (
    <Router>
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
    </Router>
  );
}

export default App;

