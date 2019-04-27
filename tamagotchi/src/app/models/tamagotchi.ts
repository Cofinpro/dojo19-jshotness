import { TamagotchiStatus } from "./TamagotchiStatus";

export class Tamagotchi {

  public saturation: number = 100;
  public satisfaction_cuddle: number = 100;
  public satisfaction_love: number = 100;
  public status = TamagotchiStatus.HAPPY;
  public alive = true;


  updateStatus() {
    if(!this.alive) {
      return;
    }
    var sum = this.saturation + this.satisfaction_cuddle + this.satisfaction_love;
    if (sum >= 300) {
      this.status = TamagotchiStatus.LOVE;
    }else if (sum <= 0) {
      this.alive = false;
      this.status = TamagotchiStatus.DEAD;
    }else if (sum <= 100) {
      this.status = TamagotchiStatus.CLOSE_TO_DEATH;
    } else if (sum <= 300) {
      this.status = TamagotchiStatus.HAPPY;
    }
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
