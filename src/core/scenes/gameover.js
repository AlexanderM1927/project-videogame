export class GameOver extends Phaser.Scene {
    constructor () {
      super({key: 'gameover'})
    }
    preload () {
      this.load.image('gameover', 'images/gameover.png')
    }
    create () {
      this.add.image(600, 200, 'gameover')
    }
}
