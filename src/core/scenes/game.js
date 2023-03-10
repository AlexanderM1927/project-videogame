import { BulletArcadeGroup } from './bulletArcadeGroup'
import { EnemyArcadeGroup } from './enemyArcadeGroup'

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
    this.load.image('bullet', 'images/bullet.png');
    this.load.image('nextlvl', 'images/nextlvl.png');
    this.load.audio('backgroundMusic', 'sounds/bgsound.mp3');
    this.load.audio('bulletSound', 'sounds/bullet.mp3');
  }

  create() {
    this.score = 0
    this.globalScore = 0
    this.life = 500
    this.bulletNum = 0
    this.lastEnemies = 3
    this.nivel = 1
    this.backgroundX = 600

    this.gramme = this.physics.add.image(this.backgroundX, 600, 'gramme')
    this.gramme.setImmovable(true)

    this.player = this.physics.add.sprite(0, 470, 'player')
    this.player.setCollideWorldBounds(true)

    this.enemies = new EnemyArcadeGroup(this, this.lastEnemies);

    this.physics.add.collider(this.player, this.gramme)

    this.cursors = this.input.keyboard.createCursorKeys();

    this.mayorPuntaje = localStorage.getItem('mayorPuntaje') ? localStorage.getItem('mayorPuntaje') : 0

    this.globalScoreText = this.add.text(window.innerWidth - 300, 16, 'PUNTAJE GLOBAL: ' + this.globalScore, { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });
    this.highestScoreText = this.add.text(window.innerWidth - 300, 32, 'MAYOR PUNTAJE: ' + this.mayorPuntaje, { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });
    this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });
    this.lifeText = this.add.text(16, 32, 'VIDA: '+ this.life, { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });
    this.lvlText = this.add.text(16, 48, 'NIVEL: '+ this.nivel, { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });

    this.bulletSound = this.sound.add('bulletSound')
    this.backgroundMusic = this.sound.add('backgroundMusic');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.play()

    this.bullets = new BulletArcadeGroup(this);

    this.createAnims()

    this.player.on('animationcomplete', this.animationComplete, this)

    this.nextlvl = this.physics.add.image(window.innerWidth / 2, 100, 'nextlvl')
    this.nextlvl.visible = false

  }

  animationComplete (animation, frame, sprite) {
    if (animation.key === 'jump') {
      this.player.setVelocityY(200)
    }
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.x += -4;
      this.doScrolling()
    }
    if (this.cursors.right.isDown) {
      this.player.x += 4;
      this.doScrolling()
    }
    if (this.cursors.up.isDown) {
      this.jumpAction()
    }
    if (this.cursors.up.isDown) {
      this.jumpAction()
    }

    if (this.cursors.space.isDown) {
      this.bullets.fireBullet(this.player.x + 120, this.player.y - 30, this.enemies);
      this.bulletSound.play();
    }
    this.input.on('pointerup', (pointer) => {
      if (pointer.leftButtonReleased()) {
        this.bullets.fireBullet(this.player.x + 120, this.player.y - 30, this.enemies);
      }
      this.bulletSound.play();
    })

    this.updateEnemy()
    this.updateStats()
  }

  updateStats () {
    if (this.life < 1) {
      this.backgroundMusic.stop()
      this.scene.start('gameover')
    }

    if (this.score > 500) {
      this.showNextLvl()
      this.score = 0
      this.scoreText.setText('PUNTOS: ' + this.score);
      this.lastEnemies += 1
      this.enemies = new EnemyArcadeGroup(this, (this.lastEnemies < 10 ? this.lastEnemies : 10));
    }

    if (this.globalScore > this.mayorPuntaje) {
      localStorage.setItem('mayorPuntaje', this.globalScore)
      this.mayorPuntaje = this.globalScore
      this.highestScoreText.setText('MAYOR PUNTAJE: ' + this.mayorPuntaje);
    }
  }

  showNextLvl () {
    this.nivel += 1
    this.lvlText.setText('NIVEL: ' + this.nivel);
    this.nextlvl.visible = true
    setTimeout(() => {
      this.nextlvl.visible = false
    }, 3000)
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
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('enemy', {
        frames: [0]
      }),
      frameRate: 2,
      repeat: -1
    })
    this.anims.create({
      key: 'fight',
      frames: this.anims.generateFrameNumbers('enemy', {
        frames: [1, 0]
      }),
      repeat: -1
    })
  }

  increasePoints(points) {
    this.score += points;
    this.globalScore += points;
    this.scoreText.setText('PUNTOS: ' + this.score);
    this.globalScoreText.setText('PUNTAJE GLOBAL: ' + this.globalScore);
  }

  decreaseLife(points) {
    this.life -= points;
    this.lifeText.setText('VIDA: ' + this.life);
  }

  jumpAction () {
    this.player.setVelocityY(-200)
    this.player.play('jump')
  }

  walkAction () {
    this.enemies.setVelocityX(-200)
    this.enemies.playAnimation('walk')
  }

  updateEnemy () {
    setTimeout(()=> {
      this.enemies.spawnEnemy(Phaser.Math.Between(800, window.innerWidth -100), 470, this.player);
    }, 1500);

    const firstEnemyAlive = this.enemies.getFirstAlive()
    if (firstEnemyAlive) {
      if (firstEnemyAlive.x < 0) {
        this.enemies.kill(firstEnemyAlive)
      }
    }

    this.walkAction()
  }

  doScrolling () {
    this.backgroundX -= 4

    if (this.backgroundX < 600) {
      this.backgroundX = 800
    }

    this.gramme.setPosition(this.backgroundX, 600)
  }
}
