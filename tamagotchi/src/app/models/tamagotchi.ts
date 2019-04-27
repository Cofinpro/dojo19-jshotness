import {TamagotchiStatus} from "./TamagotchiStatus";

export class Tamagotchi{

  public saturation: number = 100;
  public satisfaction_cuddle: number = 100;
  public satisfaction_love: number = 100;
  public status: TamagotchiStatus = TamagotchiStatus.HAPPY;
}
