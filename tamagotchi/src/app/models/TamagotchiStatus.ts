
export class TamagotchiStatus {
  
  static readonly HAPPY  = new TamagotchiStatus('Happy', '/assets/gifs/happy.gif');
  static readonly DANCE = new TamagotchiStatus('Dacne', '/assets/gifs/happy.gif');
  static readonly PLAY  = new TamagotchiStatus('Play', '/assets/gifs/happy.gif');
  static readonly CUDDLE  = new TamagotchiStatus('Cuddle', '/assets/gifs/happy.gif');

  // private to disallow creating other instances of this type
  private constructor(public readonly name: string, public readonly path: string) {
  }

}