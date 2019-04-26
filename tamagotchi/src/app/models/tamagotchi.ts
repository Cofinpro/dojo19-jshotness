import {TamagotchiStatus} from "./TamagotchiStatus";

export class Tamagotchi{

  saturation: number = 100;
  satisfaction_cuddle: number = 100;
  satisfaction_love: number = 100;
  status: TamagotchiStatus = TamagotchiStatus.Normal;
}
