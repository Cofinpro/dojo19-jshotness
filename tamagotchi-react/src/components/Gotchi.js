import React from 'react';
import Log from './Log.js';
import smile from '../emojis/smile.png';
import sick_puke from '../emojis/sick_puke.png';
import sick_thermo from '../emojis/sick_thermometer.png';
import unhappy from '../emojis/unhappy.png';
import dead from '../emojis/dead.png';
import happy from '../emojis/happy.png';
import angry from '../emojis/angry.png';
import swearing from '../emojis/swearing.png';
import './Gotchi.css';
import { stat } from 'fs';

class Gotchi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      age: 0, // starting from 0
      mood: 75, // range: 100 (perfect) to 0 (maximum angry)
      health: 70, // range: 100 (perfect) to 0 (dead)
      hunger: 9, // range: 0 to 10
      sugar: 0, // range: 0 to 10, ab 5 gesundheitsschädlich
      lastTimeMedicine: new Date(0),
      lastTimeApple: new Date(0),
      dead: false
    };
  }

  secondsSince(timestamp) {
    const diffMillies = new Date().getTime() - timestamp.getTime();
    return diffMillies/1000;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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

  logInfo(text) { this.logEvent(text) }
  logPositive(text) { this.logEvent(text, "positive") }
  logNegative(text) { this.logEvent(text, "negative") }
  logCritical(text) { this.logEvent(text, "critical") }

  /** type: (informative|positive|negative|critical) */
  logEvent(text, type = "informative") {
    this.setState(function (state) {
      const message = {
        id: state.messages.length,
        timestamp: new Date(),
        type: type,
        text: text
      }
      return { messages: [...state.messages, message] }
    });
  }

  /* User Actions */ 
  applyMedicine = () => {
    if(this.secondsSince(this.state.lastTimeMedicine) < 3) {
      this.logInfo("too much medicine is no good");
      this.increaseHealth(-1);
      return;
    }
    this.setState((state) => ({ lastTimeMedicine: new Date() }));

    this.logInfo("taking medicine");
    if (this.state.health >= 90) {
      this.logPositive("healed fully");
    }
    this.increaseHealth(25);
  }

  feedApple = () => {
    if(this.secondsSince(this.state.lastTimeApple) < 10) {
      this.logNegative("I JUST had an apple!!!!! :-(");
      this.increaseMood(-10);
      return;
    }
    this.setState((state) => ({ lastTimeApple: new Date() }));
    this.logPositive("An apple a day keeps the doctor away :-)");
    this.increaseHunger(-2);
    this.increaseHealth(5);
  }

  feedCandy = () => {
    this.logPositive("Candyyyyy... I LIKE!");
    this.increaseHunger(-4);
    this.increaseSugar(5);
  }

  playVideoGames = () => {
    this.logPositive("Let's play! Fuuuuuuuuuun :D");
    this.increaseMood(20);
  }
  

  /* Timer Actions */ 
  timer5s() {
    this.increaseMood(-5); // mood reduces over time
    this.increaseSugar(-1); // sugar in the blood reduces over time
    this.healthEffects(); // apply effects of bad health
  }

  timer10s() {
    this.increaseHunger(1); // hunger increases over time
    this.hungerEffects(); // apply effects when the gochi is hungry
    this.sugarEffects(); // apply effects when the gochi has a high sugar level
  }

  increaseMood(increment) {
    this.setState((state) => ({ mood: Math.max(0, Math.min(100, state.mood + increment)) }));
  }

  increaseHealth(increment) {
    this.setState((state) => ({ health: Math.max(0, Math.min(100, state.health + increment))}));
    if (this.state.health === 0) { 
      this.setState((state) => ({dead: true}));
    }
  }

  increaseHunger(increment) {
    this.setState((state) => ({ hunger: Math.max(0, Math.min(10, state.hunger + increment)) }));
  }

  increaseSugar(increment) {
    this.setState((state) => ({ sugar: Math.max(0, Math.min(10, state.sugar + increment)) }));
  }

  healthEffects() {
    // bad health-condition tends to worsen on its own
    if(this.state.health <= 50) { 
      this.logCritical("Gotchi's illness got worse");
      this.increaseHealth(-8);
    }

    // from time to time, illness happens randomly
    if( this.getRandomInt(100) < 15 ) { // 15% probability
      this.logCritical("OMG!! Gotchi got an illness");
      this.increaseHealth(-20 - this.getRandomInt(20)); // impact between 20 and 40
    }
  }

  sugarEffects() {
    if (this.state.sugar >= 6) {
      this.logCritical("Mind Diabetes! Too much sugar makes sick");
      this.increaseHealth(-2 * this.state.sugar);
    }
  }

  hungerEffects() {
    if (this.state.hunger >= 7) {
      this.logNegative("I'm starving, I don't feel so well!!");
      this.increaseHealth(-this.state.hunger);
      this.increaseMood(-this.state.hunger);
    } else if (this.state.hunger >= 4) {
      this.logNegative("I'm hungry!");
      this.increaseMood(-this.state.hunger);
    }
  }


  selectEmojiFace() {
    if (this.state.health === 0) {
      return dead;
    }
    if (this.state.health <= 30) {
      return sick_puke;
    }
    if (this.state.health <= 50) {
      return sick_thermo;
    }
    if (this.state.health <= 60) {
      return unhappy;
    }
     if (this.state.mood <= 20) {
      return swearing;
    }
    if (this.state.mood <= 40) {
      return angry;
    }
    if (this.state.health >= 80 && this.state.hunger < 3 && this.state.mood >= 80) {
      return happy;
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
          <FeedButton feedApple={this.feedApple} dead={this.state.dead}/>
          <FeedCandyButton feedCandy={this.feedCandy} dead={this.state.dead}/>
          <br/>
          <HealButton applyMedicine={this.applyMedicine} dead={this.state.dead} /> 
          <PlayVideoGamesButton playVideoGames={this.playVideoGames} dead={this.state.dead}/>
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
      <button className="Gotchi-button" 
      onClick={() => this.props.applyMedicine()}
      disabled={this.props.dead}
      > 💊</button>
    );
  }
}

class FeedButton extends React.Component {
  render() {
    return (
      <button className="Gotchi-button" onClick={
        () => this.props.feedApple()}
        disabled={this.props.dead}> 🍎</button>
    );
  }
}

class FeedCandyButton extends React.Component {
  render() {
    return (
      <button className="Gotchi-button" onClick={
        () => this.props.feedCandy()} disabled={this.props.dead}> 🍭</button>
    )
  }
}

class PlayVideoGamesButton extends React.Component {
  render () {
    return (
      <button className="Gotchi-button" onClick={
        () => this.props.playVideoGames()} disabled={this.props.dead}> 🎮</button>
    )
  }
}

export default Gotchi;
