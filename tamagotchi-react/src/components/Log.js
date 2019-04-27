import React from 'react';
import './Log.css';

function Log (props) {
  const messages = props.messages.slice(0).reverse();
  const lines = messages.map((message) => 
    <li key={message.id}>
      <span className="Log-time">({getTimeString(message.timestamp)})</span> 
      {message.text}
    </li>);
  
  return (
    <div className="Log-container">
      Events:
      <ul className="Log-message-list">{lines}</ul>
    </div>
  );
}

function getTimeString(date) {
  return date.getHours().toString().padStart(2, "0") + ":"
  + date.getMinutes().toString().padStart(2, "0") + ":"
  + date.getSeconds().toString().padStart(2, "0");
}

export default Log;
