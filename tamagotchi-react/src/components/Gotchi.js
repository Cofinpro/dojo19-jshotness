import React from 'react';
import smile from '../emojis/smile.png';
import './Gotchi.css';

class Gotchi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0, // starting from 0
      mood: 0, // range: -5 to 5
      health: 100 // 100 (perfect) to 0 (dead)
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState((state) => ({mood: state.mood - 1}));
  }

  render() {
    return (
      <div>
        <img src={smile} className="Gotchi-face"/>
        <h6>Age: {this.state.age} | Mood: {this.state.mood} | Health: {this.state.health}</h6>
      </div>
    );
  }
}

export default Gotchi;
