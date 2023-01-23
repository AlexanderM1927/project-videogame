export class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.image('gramme', 'images/gramme.png');
    this.load.spritesheet('player', 'images/player.png', {
      frameWidth: 120,
      frameHeight: 200
  })
    this.load.audio('backgroundMusic', 'sounds/game.ogg');
  }

  create() {
    this.score = 0

    this.gramme = this.physics.add.image(600, 600, 'gramme')
    this.gramme.setImmovable(true)

    this.player = this.physics.add.sprite(0, 470, 'player')
    // this.player.setCollideWorldBounds(true)

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
    this.physics.add.collider(this.player, this.gramme);
    if (this.cursors.left.isDown) {
      this.player.x += -4;
      this.gramme.tilePositionX += -0.5
    }
    else if (this.cursors.right.isDown) {
      this.player.x += 4;
      this.gramme.tilePositionX += 0.5
    }
    else if (this.cursors.up.isDown) {
      this.jumpAction()
    }
  }

  createAnims () {
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player', {
          start: 0,
          end: 2
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
