export class GameOver extends Phaser.Scene {
    constructor () {
      super({key: 'gameover'})
    }
    preload () {
      this.load.image('gameover', 'images/gameover.png')
    }
    create () {
      this.add.image(window.innerWidth / 2, 200, 'gameover')
    }
}
