
export class TamagotchiStatus {
  
  static readonly HAPPY  = new TamagotchiStatus('Happy', './assets/gifs/happytenor.gif');
  static readonly DANCE = new TamagotchiStatus('Dance', './assets/gifs/lovetenor.gif');
  static readonly PLAY  = new TamagotchiStatus('Play', './assets/gifs/dancetenor.gif');
  static readonly CUDDLE  = new TamagotchiStatus('Cuddle', './assets/gifs/cuddle.gif');
  static readonly DEAD  = new TamagotchiStatus('Dead', './assets/gifs/ezgif.com-crop.gif');
  static readonly CLOSE_TO_DEATH  = new TamagotchiStatus('Close to Death', './assets/gifs/dietenor.gif');
  static readonly LOVE  = new TamagotchiStatus('Love', './assets/gifs/lovetenor.gif');
  static readonly EAT  = new TamagotchiStatus('Love', './assets/gifs/eat.gif');
  static readonly HUNGRY  = new TamagotchiStatus('Love', './assets/gifs/hungry.gif');
  // private to disallow creating other instances of this type
  private constructor(public readonly name: string, public readonly path: string) {
  }



}
