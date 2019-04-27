import React from 'react';
import Log from './Log.js';
import smile from '../emojis/smile.png';
import sick_puke from '../emojis/sick_puke.png';
import sick_green from '../emojis/sick_green.png';
import sick_thermo from '../emojis/sick_thermometer.png';
import './Gotchi.css';
import { stat } from 'fs';

class Gotchi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      age: 0, // starting from 0
      mood: 50, // range: 100 (perfect) to 0 (maximum angry)
      health: 45, // range: 100 (perfect) to 0 (dead)
      hunger: 9, // range: 0 to 10
      sugar: 0 // range: 0 to 10, ab 5 gesundheitsschädlich
    };
  }

  componentDidMount() {
    this.timerID5s = setInterval(
      () => this.timer5s(),
      5000
    );
    this.timerID10s = setInterval(
      () => this.timer10s(),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID5s);
    clearInterval(this.timerID10s);
  }

  logEvent(text) {
    this.setState(function (state) {
      const message = {
        id: state.messages.length,
        timestamp: new Date(),
        text: text
      }
      return { messages: [...state.messages, message] }
    });
  }

  /* User Actions */ 
  applyMedicine = () => {
    this.logEvent("taking medicine");
    if (this.state.health >= 90) {
      this.logEvent("healed fully");
    }
    this.increaseHealth(10);
  }

  feedApple = () => {
    this.increaseHunger(-2);
    this.increaseSugar(1);
  }

  feedCandy = () => {
    this.increaseHunger(-4);
    this.increaseSugar(5);
  }


  /* Timer Actions */ 
  timer5s() {
    this.increaseMood(-5); // mood reduces over time
    this.healthEffects(); // apply effects of bad health
  }

  timer10s() {
    this.increaseSugar(-1); // sugar in the blood reduces over time
    this.increaseHunger(1); // hunger increases over time
    this.hungerEffects(); // apply effects when the gochi is hungry
    this.sugarEffects(); // apply effects when the gochi has a high sugar level
  }

  increaseMood(increment) {
    this.setState((state) => ({ mood: Math.max(0, Math.min(100, state.mood + increment)) }));
  }

  increaseHealth(increment) {
    this.setState((state) => ({ health: Math.max(0, Math.min(100, state.health + increment)) }));
  }

  increaseHunger(increment) {
    this.setState((state) => ({ hunger: Math.max(0, Math.min(10, state.hunger + increment)) }));
  }

  increaseSugar(increment) {
    this.setState((state) => ({ sugar: Math.max(0, Math.min(10, state.sugar + increment)) }));
  }

  healthEffects() {
    if(this.state.health <= 50) { 
      this.increaseHealth(-8);
    }
  }

  sugarEffects() {
    if (this.state.sugar >= 5) {
      this.increaseHealth(-15);
    }
  }

  hungerEffects() {
    if (this.state.hunger >= 4) {
      this.increaseMood(-this.state.hunger);
    }
    if (this.state.hunger >= 7) {
      this.increaseHealth(-this.state.hunger);
    }
  }

  selectEmojiFace() {
    if (this.state.health <= 30) {
      return sick_puke;
    }
    if (this.state.health <= 50) {
      return sick_thermo;
    }
    if (this.state.health <= 60) {
      return sick_green;
    }
    return smile;
  }


  render() {
    return (
      <div className="Gotchi-frame">
        <div className="Gotchi-status">
          <h6>Age: {this.state.age}</h6>
          <h6>Mood: {this.state.mood}</h6>
          <h6>Health: {this.state.health}</h6>
          <h6>Hunger: {this.state.hunger}</h6>
          <h6>Sugar: {this.state.sugar}</h6>
          <HealButton applyMedicine={this.applyMedicine} />
          <FeedButton feedApple={this.feedApple} />
          <FeedCandyButton feedCandy={this.feedCandy} />
        </div>
        <div className="Gotchi-box">
          <img src={this.selectEmojiFace()} alt="" className="Gotchi-face" />
        </div>
        <Log messages={this.state.messages} className="Gotchi-log" />
      </div>
    );
  }
}

class HealButton extends React.Component {
  render() {
    return (
      <button onClick=
        {() => this.props.applyMedicine()}>give medicine 💊</button>
    );
  }
}

class FeedButton extends React.Component {
  render() {
    return (
      <button onClick={
        () => this.props.feedApple()}>feed apple 🍎</button>
    );
  }
}

class FeedCandyButton extends React.Component {
  render() {
    return (
      <button onClick={
        () => this.props.feedCandy()}>feed candy 🍭</button>
    )
  }
}

export default Gotchi;
