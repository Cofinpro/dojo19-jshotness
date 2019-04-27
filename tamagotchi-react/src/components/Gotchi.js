import React from 'react';
import Log from './Log.js';
import smile from '../emojis/smile.png';
import sick_puke from '../emojis/sick_puke.png';
import sick_green from '../emojis/sick_green.png';
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
      lastTimeApple: new Date(0)
    };
  }

  secondsSince(timestamp) {
    const diffMillies = new Date().getTime() - timestamp.getTime();
    return diffMillies/1000;
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
    if(this.secondsSince(this.state.lastTimeMedicine) < 5) {
      this.logEvent("too much medicine is no good");
      this.increaseHealth(-5);
      return;
    }
    this.setState((state) => ({ lastTimeMedicine: new Date() }));

    this.logEvent("taking medicine");
    if (this.state.health >= 90) {
      this.logEvent("healed fully");
    }
    this.increaseHealth(10);
  }

  feedApple = () => {
    if(this.secondsSince(this.state.lastTimeApple) < 10) {
      this.logEvent("I JUST had an apple!!!!! :-(");
      this.increaseMood(-10);
      return;
    }
    this.setState((state) => ({ lastTimeApple: new Date() }));
    this.logEvent("An apple a day keeps the doctor away :-)");
    this.increaseHunger(-2);
    this.increaseSugar(1);
    this.increaseHealth(5);
  }

  feedCandy = () => {
    this.logEvent("Candyyyyy... I LIKE!");
    this.increaseHunger(-4);
    this.increaseSugar(5);
  }

  playVideoGames = () => {
    this.logEvent("Fuuuuuuuuuun :D");
    this.increaseMood(20);
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
    // bad health-condition tends to worsen on its own
    if(this.state.health <= 50) { 
      this.logEvent("Gotchi's illness got worse");
      this.increaseHealth(-8);
    }

    // from time to time, illness happens randomly
    if( Math.random() * 100 < 20 ) { // 20% probability
      this.logEvent("OMG!! Gotchi got an illness");
      this.increaseHealth(-40);
    }
  }

  sugarEffects() {
    if (this.state.sugar >= 5) {
      this.logEvent("Diabetes alert! Too much sugar is unhealthy");
      this.increaseHealth(-15);
    }
  }

  hungerEffects() {
    if (this.state.hunger >= 7) {
      this.logEvent("I'm starving, I don't feel so well!!");
      this.increaseHealth(-this.state.hunger);
      this.increaseMood(-this.state.hunger);
    } else if (this.state.hunger >= 4) {
      this.logEvent("I'm hungry!");
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
          <HealButton applyMedicine={this.applyMedicine} />
          <FeedButton feedApple={this.feedApple} />
          <FeedCandyButton feedCandy={this.feedCandy} />
          <PlayVideoGamesButton playVideoGames={this.playVideoGames}/>
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

class PlayVideoGamesButton extends React.Component {
  render () {
    return (
      <button onClick={
        () => this.props.playVideoGames()}>play video games 🎮</button>
    )
  }
}

export default Gotchi;
