export class Enemy extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y)
  {
    super(scene, x, y, 'enemy');
  }

  spawn (x, y, player) {

    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.scene.physics.add.collider(this,  player, ()=>{
      player.tint = 0xff0000;
      this.hitTimer = this.scene.time.delayedCall(50, () => {
        player.tint = this.originalSpaceShipTint;
        this.setVisible(false);
        this.setActive(false);
        this.scene.decreaseLife(1)
    }, [], this.scene);
    });
  }
}
