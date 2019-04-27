
export class TamagotchiStatus {
  
  static readonly HAPPY  = new TamagotchiStatus('Happy', './assets/gifs/happy.gif');
  static readonly DANCE = new TamagotchiStatus('Dance', './assets/gifs/dance.gif');
  static readonly PLAY  = new TamagotchiStatus('Play', './assets/gifs/play.gif');
  static readonly CUDDLE  = new TamagotchiStatus('Cuddle', './assets/gifs/cuddle.gif');
  static readonly DEAD  = new TamagotchiStatus('Dead', './assets/gifs/end.gif');
  static readonly CLOSE_TO_DEATH  = new TamagotchiStatus('Close to Death', './assets/gifs/dietenor.gif');
  static readonly LOVE  = new TamagotchiStatus('Love', './assets/gifs/lovetenor.gif');

  // private to disallow creating other instances of this type
  private constructor(public readonly name: string, public readonly path: string) {
  }

}