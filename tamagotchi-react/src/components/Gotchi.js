import React from 'react';
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
      age: 0, // starting from 0
      mood: 0, // range: -5 to 5
      health: 45, // 100 (perfect) to 0 (dead)
      hunger: 9, //range: 0 - 10
      sugar: 0 //range 0 -10, ab 5 gesundheitsschädlich
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tickMood(1),
      5000
    );
    this.timerHealth = setInterval(
      () => this.tickHealth(5),
      250000
    );
    this.timerHunger = setInterval(
      () => this.tickHunger(), 
      8000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  applyMedicine = () => {

    if(this.state.health < 100){
      this.setState((state) => ({health: state.health + 10}));
    }
    if(this.state.health === 95){
      this.setState((state) => ({health: 100}))
    }
    
  }

  feedApple = () => {
    if(this.state.hunger < 100) {
      this.setState((state) => ({hunger: state.hunger - 3, sugar: state.sugar +1}));
    }
  }

  feedCandy = () => {
    this.setState((state) => ({sugar: state.sugar +3, hunger: state.hunger -1}));
  }

  tickMood(value) {
    this.setState((state) => ({mood: state.mood - value}));
  }

  tickHealth(value) {
    this.setState((state) => ({health: state.health - value}));
  }

  tickHunger() {
    if (this.state.hunger < 10 ) {
      this.setState((state) => ({hunger: state.hunger + 1}), () => {
       this.hungerEffects()
      });
    } else {
      this.hungerEffects();
    }
  }

  tickSugar() {
    if (this.state.sugar > 0) {
      this.setState((state) => ({sugar: state.sugar -1}));
    }
    if (this.state.sugar >= 5) {
      this.setState((state) => ({health: state.health - 5}));
    }
  }

  hungerEffects() {
    if(this.state.hunger >= 4){
      this.tickMood(this.state.hunger);
    }
    if(this.state.hunger >= 7) {
      this.tickHealth(this.state.hunger);
    }
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
        <h6>Age: {this.state.age} | Mood: {this.state.mood} | Health: {this.state.health} | Hunger: {this.state.hunger} | Sugar: {this.state.sugar}</h6> 
        <HealButton applyMedicine={this.applyMedicine}/>
        <FeedButton feedApple={this.feedApple}></FeedButton>
        <FeedCandyButton feedCandy={this.feedCandy}></FeedCandyButton>
      </div>

    
    );
  }
}
class HealButton extends React.Component  {
  
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
        <button onClick = {
          () => this.props.feedApple()}>feed apple 🍎</button>
      );
    }
  }

  class FeedCandyButton extends React.Component {
    render() {
      return (
        <button onClick = {
          () => this.props.feedCandy()}>feed candy 🍭</button>
      )
    }
  }

export default Gotchi;
