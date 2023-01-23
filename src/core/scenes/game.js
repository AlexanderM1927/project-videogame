export class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.image('gramme', 'images/gramme.png');
    this.load.image('player', 'images/player.png');
    this.load.audio('playingSound', 'sounds/game.ogg');
  }

  create() {
    this.power = 0;

    this.gramme = this.add.tileSprite(window.innerWidth / 2, 600, window.innerWidth, 70, 'gramme')

    this.player = this.physics.add.image(100, 470, 'player')

    this.cursors = this.input.keyboard.createCursorKeys();

    this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });

    this.playingSound = this.sound.add('playingSound');
    this.playingSound.loop = true;
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.x += -4;
      this.gramme.tilePositionX += -0.5
    }
    else if (this.cursors.right.isDown) {
      this.player.x += 4;
      this.gramme.tilePositionX += 0.5
    }
    else if (this.cursors.up.isDown) {
      console.log('activo')
      this.player.setBounce(1)
    }
  }

  increasePoints(points) {
    this.score += points;
    this.scoreText.setText('PUNTOS: ' + this.score);
  }
}
