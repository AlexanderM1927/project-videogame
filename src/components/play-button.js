export class PlayButton {
    constructor(scene) {
      this.relatedScene = scene;
    }

    preload() {
      this.relatedScene.load.spritesheet('playButton', 'images/play.png', { frameWidth: 190, frameHeight: 49 });
    }

    create() {
      this.playButton = this.relatedScene.add.sprite(400, 330, 'playButton').setInteractive();

      this.playButton.on('pointerover', () => {
        this.playButton.setFrame(1);
      });
      this.playButton.on('pointerout', () => {
        this.playButton.setFrame(0);
      });
      this.playButton.on('pointerdown', () => {
        this.relatedScene.scene.start('game');
      });
    }
  }
