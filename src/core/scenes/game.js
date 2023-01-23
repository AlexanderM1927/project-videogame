export class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.image('gramme', 'images/gramme.png');
    this.load.spritesheet('player', 'images/player.png', {
      frameHeight: 200,
      frameWidth: 200
    })
    this.load.spritesheet('enemy', 'images/enemy.png', {
      frameHeight: 200,
      frameWidth: 200
    })
    this.load.audio('backgroundMusic', 'sounds/bgsound.mp3');
  }

  create() {
    this.score = 0

    this.gramme = this.physics.add.image(600, 600, 'gramme')
    this.gramme.setImmovable(true)

    this.player = this.physics.add.sprite(0, 470, 'player')
    this.player.setCollideWorldBounds(true)

    this.enemy = this.physics.add.sprite(window.innerWidth - 120, 475, 'enemy')

    this.physics.add.collider(this.player, this.gramme)

    this.cursors = this.input.keyboard.createCursorKeys();

    this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });

    this.backgroundMusic = this.sound.add('backgroundMusic');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.play()

    this.createAnims()

    this.player.on('animationcomplete', this.animationComplete, this)

  }

  animationComplete (animation, frame, sprite) {
    if (animation.key === 'jump') {
      this.player.setVelocityY(200)
    }
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.x += -4;
    }
    else if (this.cursors.right.isDown) {
      this.player.x += 4;
    }
    else if (this.cursors.up.isDown) {
      this.jumpAction()
    }
  }

  createAnims () {
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [ 0, 1, 0]
      }),
      frameRate: 7,
      repeat: 1
    })
  }

  increasePoints(points) {
    this.score += points;
    this.scoreText.setText('PUNTOS: ' + this.score);
  }

  jumpAction () {
    this.player.setVelocityY(-200)
    this.player.play('jump')
  }
}
