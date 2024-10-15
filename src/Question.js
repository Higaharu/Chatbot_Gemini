import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Question = ({ setQuestion, setAnswer }) => {
  const [inputValue, setInputValue] = useState(""); // 入力された質問
  const [selectedOption, setSelectedOption] = useState(""); // 質問の選択肢
  const [isWaiting, setIsWaiting] = useState(false); // APIからの応答を待機中かどうかの状態
  const navigate = useNavigate(); // 画面遷移のためのフック

  const API_KEY = ''; // APIキーをここに追加してください

  // Gemini APIに質問を送信する関数
  const sendMessageToAPI = async (message) => {
    setIsWaiting(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: message }] }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      // Geminiの回答をセットし、画面遷移
      const botAnswer = response.data.candidates[0].content.parts[0].text;
      setQuestion(message); // 質問をセット
      setAnswer(botAnswer); // 回答をセット
      navigate("/answer"); // 回答画面に遷移
    } catch (error) {
      console.error("APIリクエストエラー: ", error);
      setAnswer("エラーが発生しました。もう一度試してください。");
      navigate("/answer"); // エラー時でも遷移
    } finally {
      setIsWaiting(false);
    }
  };

  // 質問が選択された場合に入力フィールドを表示
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // 質問をAPIに送信
    sendMessageToAPI(inputValue);
  };

  return (
    <div className="question-container">
      <h1>質問画面</h1>
      <form onSubmit={handleSubmit} className="input-form">
        <div className="question-selection">
          <label>回答者を選んでください</label>
          <select>
            <option value="荘司さん">荘司さん</option>
            <option value="ロボット">ロボット</option>
          </select>
        </div>

        <div className="explanation-selection">
          <label>回答の説明の仕方を選べます</label>
          <select>
            <option value="おとな向け">おとな向け</option>
            <option value="こども向け">こども向け</option>
          </select>
        </div>

        <div className="question-options">
          <label>質問したいことを選んでください</label>
          <select onChange={handleOptionChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">自由入力</option>
          </select>
        </div>

        {selectedOption === "10" && (
          <div className="input-section">
            <label>質問したいことを入力してください</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="質問を入力してください..."
              disabled={isWaiting}
            />
          </div>
        )}

        <button type="submit" disabled={isWaiting}>
          {isWaiting ? "待機中..." : "送信"}
        </button>
      </form>
    </div>
  );
};

export default Question;
