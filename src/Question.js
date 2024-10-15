import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Question = ({ setQuestion, setAnswer }) => {
  const [inputValue, setInputValue] = useState(""); // 入力された質問
  const [selectedResponder, setSelectedResponder] = useState("ロボット"); // 回答者
  const [selectedExplanation, setSelectedExplanation] = useState("おとな向け"); // 説明の仕方
  const [selectedQuestion, setSelectedQuestion] = useState("1"); // 選択された質問
  const [isWaiting, setIsWaiting] = useState(false); // APIからの応答を待機中かどうかの状態
  const navigate = useNavigate(); // 画面遷移のためのフック

  const API_KEY = '';  // APIキーをここに追加してください

  // 質問番号に対応する質問文
  const questionTexts = {
    "0": "アップルバナナついて教えてください。",
    "1": "マルエスファームについて教えてください。",
    "2": "アップルバナナの美味しい食べ方について教えてください。",
    "3": "アップルバナナついて教えてください。",
    "4": "マルエスファームについて教えてください。",
    "5": "キッチンカーについて教えてください。",
    "6": "アップルバナナを育てる上でこだわりはありますか？",
    "7": "アップルバナナの美味しい食べ方を教えてください。",
    "8": "マルエスファームではアップルバナナ以外に何を栽培していますか？",
    "9": "台風の多い沖縄ではどのような備えをしますか？",
  };

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

  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault();

    // 自由入力か選択された質問文かを決定
    const questionText = selectedQuestion === "10" ? inputValue : questionTexts[selectedQuestion];

    // プロンプトメッセージを生成
    const promptMessage = `あなたは"${selectedResponder}"です。\n"${selectedExplanation}に"説明してください。\n"${questionText}"`;

    // 質問をAPIに送信
    sendMessageToAPI(promptMessage);
  };

  return (
    <div className="question-container">
      <h1>質問画面</h1>
      <form onSubmit={handleSubmit} className="input-form">
        <div className="question-selection">
          <label>回答者を選んでください</label>
          <select value={selectedResponder} onChange={(e) => setSelectedResponder(e.target.value)}>
            <option value="荘司さん">荘司さん</option>
            <option value="ロボット">ロボット</option>
          </select>
        </div>

        <div className="explanation-selection">
          <label>回答の説明の仕方を選べます</label>
          <select value={selectedExplanation} onChange={(e) => setSelectedExplanation(e.target.value)}>
            <option value="おとな向け">おとな向け</option>
            <option value="こども向け">こども向け</option>
          </select>
        </div>

        <div className="question-options">
          <label>質問したいことを選んでください</label>
          <select value={selectedQuestion} onChange={(e) => setSelectedQuestion(e.target.value)}>
            <option value="0">0. アップルバナナついて教えてください。</option>
            <option value="1">1. マルエスファームについて教えてください。</option>
            <option value="2">2. アップルバナナの美味しい食べ方について教えてください。</option>
            <option value="3">3. アップルバナナついて教えてください。</option>
            <option value="4">4. マルエスファームについて教えてください。</option>
            <option value="5">5. キッチンカーについて教えてください。</option>
            <option value="6">6. アップルバナナを育てる上でこだわりはありますか？</option>
            <option value="7">7. アップルバナナの美味しい食べ方を教えてください。</option>
            <option value="8">8. マルエスファームではアップルバナナ以外に何を栽培していますか？</option>
            <option value="9">9. 台風の多い沖縄ではどのような備えをしますか？</option>
            <option value="10">自由入力</option>
          </select>
        </div>

        {selectedQuestion === "10" && (
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
