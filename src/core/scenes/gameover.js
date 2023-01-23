import { RestartButton } from "../../components/restart-button";

export class GameOver extends Phaser.Scene {
    constructor () {
      super({key: 'gameover'})
      this.restartButton = new RestartButton(this);
    }
    preload () {
      this.load.image('gameover', 'images/gameover.png')
      this.restartButton.preload();
  }
    create () {
      this.add.image(window.innerWidth / 2, 200, 'gameover')

      this.restartButton.create();
    }
}
