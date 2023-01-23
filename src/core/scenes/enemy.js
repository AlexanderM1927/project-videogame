export class Enemy extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y)
  {
    super(scene, x, y, 'enemy');
    this.enemySpeed = 0;
    this.xTarget = 0;
    this.speed = 3;
  }

  spawn (x, y, player) {
    this.originalPlayerTint = this.tint;

    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);


    this.scene.physics.add.collider(this,  player, ()=>{
      player.tint = 0xff0000;
      this.play('fight')
      setTimeout(() => {
        this.setVisible(false);
        this.setActive(false);
      }, 500)
      this.hitTimer = this.scene.time.delayedCall(50, () => {
        player.tint = this.originalPlayerTint;
        this.scene.decreaseLife(1)
      }, [], this.scene);
    });
  }

  preUpdate (time, delta)
  {
    super.preUpdate(time, delta);
  }
}
