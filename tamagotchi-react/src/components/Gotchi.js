import React from 'react';
import Log from './Log.js';
import smile from '../emojis/smile.png';
import './Gotchi.css';

class Gotchi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      age: 0, // starting from 0
      mood: 0, // range: -5 to 5
      health: 100 // 100 (perfect) to 0 (dead)
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.reduceMood();
  }

  reduceMood() {
    this.setState((state) => ({mood: state.mood - 1}));
    this.addEvent("getting impatient");
  }

  addEvent(text) {
    this.setState(function (state) { 
      const message = {
        id: state.messages.length,
        timestamp: new Date(),
        text: text
      }
      return {messages: [...state.messages, message]}
    });
  }

  render() {
    return (
      <div className="Gotchi-frame">
        <div className="Gotchi-status">
          <h6>Age: {this.state.age}</h6>
          <h6>Mood: {this.state.mood}</h6>
          <h6>Health: {this.state.health}</h6>
        </div>
        <div className="Gotchi-box">
          <img src={smile} alt="" className="Gotchi-face"/>
        </div>
        <Log messages={this.state.messages} className="Gotchi-log" />
      </div>
    );
  }
}

export default Gotchi;
