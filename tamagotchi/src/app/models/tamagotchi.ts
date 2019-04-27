import { TamagotchiStatus } from "./TamagotchiStatus";

export class Tamagotchi {

  public saturation: number = 100;
  public satisfaction_cuddle: number = 100;
  public satisfaction_love: number = 100;
  public status = TamagotchiStatus.HAPPY;
  public alive = true;
  public hint: string = "I have no idea what I want";


  updateStatus() {
    if(!this.alive) {
      return;
    }

    var smallest;
      if ((this.satisfaction_cuddle < this.satisfaction_love)&&(this.satisfaction_cuddle < this.saturation)){
        smallest = "cuddle";
      } else if ((this.satisfaction_love < this.satisfaction_cuddle)&&(this.satisfaction_love < this.saturation)){
        smallest = "play";
      } else if ((this.saturation < this.satisfaction_cuddle)&&(this.saturation < this.satisfaction_love)){
        smallest = "hunger";
      } else if ((this.satisfaction_cuddle == this.satisfaction_love)&&(this.satisfaction_cuddle == this.saturation)){
        smallest = "allthesame";
      } else if (this.satisfaction_cuddle == this.satisfaction_love){
        smallest = "cuddle";
      } else {
        smallest = "hunger";
      }


    if ((this.satisfaction_love <= 80)||(this.satisfaction_cuddle <= 70)||(this.saturation <= 75)) {
      if (this.saturation <= 0) {
        this.alive = false;
        this.status = TamagotchiStatus.DEAD;
        this.hint = "DEAD! I am DEAD :-(";
      } else if ((this.saturation <= 20)) {
        this.status = TamagotchiStatus.CLOSE_TO_DEATH;
        this.hint = "I am really starving! I am nearly dying";
      } else if (this.saturation <= 40) {
        this.status = TamagotchiStatus.CLOSE_TO_DEATH;
        this.hint = "I am hungry!";
      } else if (this.satisfaction_cuddle <= 20) {
        this.status = TamagotchiStatus.CLOSE_TO_DEATH;
        this.hint = "I need cuddllllleees! Cuddle me or I die!!";
      } else if (this.satisfaction_love <= 20) {
        this.status = TamagotchiStatus.CLOSE_TO_DEATH;
        this.hint = "You goddamm have to play with me!";
      } else if (smallest == "hunger") {
        this.status = TamagotchiStatus.HAPPY;
        this.hint = "I think I could eat a bit";
      } else if (smallest == "cuddle") {
        this.status = TamagotchiStatus.HAPPY;
        this.hint = "I think I deserve a hug";
      } else if (smallest == "play") {
        this.status = TamagotchiStatus.HAPPY;
        this.hint = "I am bored";
      } else if (smallest == "allthesame") {
        this.status = TamagotchiStatus.HAPPY;
        this.hint = "Hey dude, are you bored?";
      }
    } else {
      this.status = TamagotchiStatus.HAPPY;
      this.hint = "I am happy";
    }

    console.log(this.hint);

    // var sum = this.saturation + this.satisfaction_cuddle + this.satisfaction_love;
    // if (sum >= 300) {
    //   this.status = TamagotchiStatus.LOVE;
    // }else if (sum <= 0) {
    //   this.alive = false;
    //   this.status = TamagotchiStatus.DEAD;
    // }else if (sum <= 100) {
    //   this.status = TamagotchiStatus.CLOSE_TO_DEATH;
    // } else if (sum <= 300) {
    //   this.status = TamagotchiStatus.HAPPY;
    // }
  }

  validate(){
    if(this.alive) {
      this.saturation=Math.min(100,Math.max(0, this.saturation));
      this.satisfaction_cuddle=Math.min(100,Math.max(0, this.satisfaction_cuddle));
      this.satisfaction_love=Math.min(100,Math.max(0, this.satisfaction_love));
    } else {
      this.saturation = 0;
      this.satisfaction_cuddle = 0;
      this.satisfaction_love = 0;
    }
  }
}
