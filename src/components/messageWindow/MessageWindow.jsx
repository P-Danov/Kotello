import React, { useState, useContext, useEffect, useRef } from "react";
import ApiContext from "../../context/ApiContext";
import "./messageWindow.css";

const MessageWindow = () => {
  const { message, setMessage, messageText } = useContext(ApiContext);
  const [visible, setVisible] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const delay = 6000;

  useEffect(() => {
    let timeoutId; 
    if (message) {
      setVisible(true);
      timeoutId = setTimeout(() => {
        setMessage(false);
      }, delay);
      setButtonPressed(false);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, messageText, setMessage]);

  const handleTransitionEnd = () => {
    if (!message) {
      setVisible(false);
    }
  };

  return (
    <div
      className="messageWindow"
      style={{
        display: visible ? "block" : "none", 
        opacity: message ? "1" : "0", 
        transition: message||buttonPressed ? "opacity 0.3s" : "opacity 3s", 
      }}
      onTransitionEnd={handleTransitionEnd} 
    >
      <div className="messageWindowContainer">
        <div className="messageText">{messageText.text}</div>
        <button
          className="messageCancel"
          onClick={() => {
            setMessage(false);
            setButtonPressed(true);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default MessageWindow;

