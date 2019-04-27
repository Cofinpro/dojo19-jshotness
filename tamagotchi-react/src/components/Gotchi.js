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
      emojiA: smile,
      emojiB: smile,
      emojiAclass: "fadein",
      emojiBclass: "fadein",
      emojiAactive: false,
      lastTimeGaming: new Date(0),
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
    this.timerID60s = setInterval(
      () => this.timer60s(),
      60000
    );
    this.timerID1s = setInterval( () => this.timer1s(), 1000 );
    this.timerID5s = setInterval( () => this.timer5s(), 5000 );
    this.timerID10s = setInterval( () => this.timer10s(), 10000 );
  }

  componentWillUnmount() {
    this.stopTimers();
  }

  stopTimers() {
    clearInterval(this.timerID1s);
    clearInterval(this.timerID5s);
    clearInterval(this.timerID10s);
    clearInterval(this.timerID60s);
  }

  logInfo(text) { this.logEvent(text) }
  logPositive(text) { this.logEvent("\""+text+"\"", "positive") }
  logNegative(text) { this.logEvent("\""+text+"\"", "negative") }
  logWarning(text) { this.logEvent(text, "warning") }
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
      this.logNegative("Do I have to take it again???");
      this.increaseHealth(-1);
      return;
    }
    this.setState((state) => ({ lastTimeMedicine: new Date() }));

    this.logInfo("taking medicine");
    this.logPositive("Ahhh... I already start feeling better");
    if (this.state.health >= 90) {
      this.logPositive("healed fully");
    }
    this.increaseHealth(30);
  }

  feedApple = () => {
    if(this.secondsSince(this.state.lastTimeApple) < 10) {
      this.logNegative("I JUST had an apple!!!!! :-(");
      this.increaseMood(-10);
      return;
    }
    this.logInfo("eating an apple");
    this.setState((state) => ({ lastTimeApple: new Date() }));
    this.logPositive("An apple a day keeps the doctor away :-)");
    this.increaseHunger(-2);
    this.increaseHealth(5);
  }

  feedCandy = () => {
    this.logInfo("eating lots of sweets");
    this.logPositive("Candyyyyy... I LIKE!");
    this.increaseHunger(-4);
    this.increaseSugar(5);
  }

  playVideoGames = () => {
    if(this.secondsSince(this.state.lastTimeGaming) < 3) {
      this.logWarning("Gotchi deserves a break, don't you think?")
      return;
    }
    this.setState((state) => ({ lastTimeGaming: new Date() }));

    this.logPositive("Let's play! Fuuuuuuuuuun :D");
    this.increaseMood(20);
  }
  

  /* Timer Actions */ 
  timer1s() {
    this.checkIfDead(); // stop everything if dead
  }

  timer5s() {
    this.increaseMood(-7); // mood reduces over time
    this.increaseSugar(-1); // sugar in the blood reduces over time
    this.healthEffects(); // apply effects of bad health
  }

  timer10s() {
    this.increaseHunger(1); // hunger increases over time
    this.hungerEffects(); // apply effects when the gochi is hungry
    this.sugarEffects(); // apply effects when the gochi has a high sugar level
  }

  timer60s() {
    this.increaseAge(); //every minute age goes one up
  }

  increaseMood(increment) {
    this.setState((state) => ({ mood: Math.max(0, Math.min(100, state.mood + increment)) }));
  }

  increaseHealth(increment) {
    this.setState((state) => ({ health: Math.max(0, Math.min(100, state.health + increment))}));
  }

  increaseHunger(increment) {
    this.setState((state) => ({ hunger: Math.max(0, Math.min(10, state.hunger + increment)) }));
  }

  increaseSugar(increment) {
    this.setState((state) => ({ sugar: Math.max(0, Math.min(10, state.sugar + increment)) }));
  }

  increaseAge() {
    this.setState((state) => ({age: state.age + 1}));
  }
  
  checkIfDead() {
    if (this.state.health === 0) { 
      this.stopTimers();
      this.logCritical("Gotchi died 😭😭😭 This is a sad day! ⚱️")
      this.setState(() => ({dead: true}));
    }
  }

  healthEffects() {
    // bad health-condition tends to worsen on its own
    if(this.state.health <= 25) { 
      this.logCritical("Gotchi's condition ist getting very serious!");
      this.increaseHealth(-4);
    } else if(this.state.health <= 50) { 
      this.logWarning("Gotchi's illness got worse");
      this.increaseHealth(-7);
    } else if( this.getRandomInt(100) < 8 ) { // from time to time, illness happens randomly with 8% probability
      this.logCritical("OMG!! Gotchi got an illness");
      this.increaseHealth(-20 - this.getRandomInt(20)); // impact between 20 and 40
    } else {
      this.increaseHealth(-5);
    }
  }

  sugarEffects() {
    if (this.state.sugar >= 6) {
      this.logWarning("Mind Diabetes! Too much sugar makes sick");
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

  determineEmojiFace() {
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
     if (this.state.mood <= 20 || this.state.hunger > 8) {
      return swearing;
    }
    if (this.state.mood <= 40 || this.state.hunger > 6) {
      return angry;
    }
    if (this.state.mood <= 80 || this.state.hunger > 3) {
      return smile;
    }
    return happy;
  }

  setState(state, callback) {
    super.setState(state, callback);
    this.updateEmoji();
  }

  /** call whenever some changes are made to the status */
  updateEmoji() {
    const newEmoji = this.determineEmojiFace();
    super.setState(function (state) { 
      const currentEmoji = state.emojiAactive ? state.emojiA : state.emojiB;
      if( currentEmoji == newEmoji ) { return };

      if( newEmoji == dead ) {
        return {
          emojiAclass: state.emojiAactive ? "fadeout" : "fadein stop-animation",
          emojiBclass: state.emojiAactive ? "fadein stop-animation" : "fadeout",
          emojiA: state.emojiAactive ? state.emojiA : newEmoji,
          emojiB: state.emojiAactive ? newEmoji : state.emojiB, 
          emojiAactive: !state.emojiAactive 
        };
      }

      // change active emoji, fade one in and the other out
      return {
        emojiAclass: state.emojiAactive ? "fadeout" : "fadein",
        emojiBclass: state.emojiAactive ? "fadein" : "fadeout",
        emojiA: state.emojiAactive ? state.emojiA : newEmoji,
        emojiB: state.emojiAactive ? newEmoji : state.emojiB, 
        emojiAactive: !state.emojiAactive 
      };
    });
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
          <img src={this.state.emojiA} alt="" className={"Gotchi-face " + this.state.emojiAclass} />
          <img src={this.state.emojiB} alt="" className={"Gotchi-face " + this.state.emojiBclass} />
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
