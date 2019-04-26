import React from 'react';
import smile from './smile.png';
import './App.css';

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
        <img src={smile} className="App-logo"/>
        <h6>Age: {this.state.age} | Mood: {this.state.mood} | Health: {this.state.health}</h6>
      </div>
    );
  }
}

function App() {
  return ( 
    <div className="App">
      <header className="App-header">
        <h1>Welcome to your interactive Tamagotchi</h1>
        <h2>Take care and keep it in good mood and health</h2>
        <Gotchi />
      </header>
    </div>
  );
}

export default App;
