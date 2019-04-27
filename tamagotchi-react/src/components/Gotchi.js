import React from 'react';
import smile from '../emojis/smile.png';
import sick_puke from '../emojis/sick_puke.png';
import sick_green from '../emojis/sick_green.png';
import sick_thermo from '../emojis/sick_thermometer.png';
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

  selectEmojiFace(){

    if(this.state.health <= 30) {
      return sick_puke;
    }
    if(this.state.health <= 50) {
      return sick_thermo;
    }
    if(this.state.health < 60){
      return sick_green;
    }
    return smile;
  }

  render() {
    return (
      <div>
        <img src={this.selectEmojiFace()} alt="" className="Gotchi-face"/>
        <h6>Age: {this.state.age} | Mood: {this.state.mood} | Health: {this.state.health}</h6>
      </div>
    );
  }
}

export default Gotchi;
