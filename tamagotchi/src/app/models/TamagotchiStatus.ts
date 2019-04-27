
export class TamagotchiStatus {
  
  static readonly HAPPY  = new TamagotchiStatus('Happy', './assets/gifs/happy.gif');
  static readonly DANCE = new TamagotchiStatus('Dance', './assets/gifs/dance.gif');
  static readonly PLAY  = new TamagotchiStatus('Play', './assets/gifs/play.gif');
  static readonly CUDDLE  = new TamagotchiStatus('Cuddle', './assets/gifs/cuddle.gif');

  // private to disallow creating other instances of this type
  private constructor(public readonly name: string, public readonly path: string) {
  }

}