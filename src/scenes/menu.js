import { PlayButton } from "../components/play-button.js";

export class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
    this.playButton = new PlayButton(this);
  }

  preload() {
    this.load.image('menu', 'images/background-preload.png');
    this.playButton.preload();
  }

  create() {
    this.add.image(410, 350, 'background');
    this.menuImage = this.add.image(400, 150, 'menu');
    this.playButton.create();
  }
}
