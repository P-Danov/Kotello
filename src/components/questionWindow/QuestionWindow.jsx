import React, { useContext } from "react";
import ApiContext from "../../context/ApiContext";
import "./questionWindow.css";

const QuestionWindow = () => {
  const { questionWindow, setQuestionWindow, questionWindowText, questionWindowVariable } =
    useContext(ApiContext);

  const handleDecision = (decision) => {
    if (questionWindowVariable) {
      questionWindowVariable(decision);
    }
    setQuestionWindow(false);
  };

  return (
    <div
      className="questionWindowContent"
      style={questionWindow ? { display: "block" } : { display: "none" }}
    >
      <div
        className="questionWindow"
        style={questionWindow ? { display: "block" } : { display: "none" }}
      >
        <div className="questionWindowContainer">
          <div className="questionWindowText">{questionWindowText[0].mainText}</div>
          <button className="questionWindowAccept" onClick={() => handleDecision(true)}>
            {questionWindowText[0].option1}
          </button>
          <button className="questionWindowCancel" onClick={() => handleDecision(false)}>
            {questionWindowText[0].option2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionWindow;