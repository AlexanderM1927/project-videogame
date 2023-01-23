export class Bullet extends Phaser.Physics.Arcade.Sprite
{
  constructor (scene, x, y)
  {
    super(scene, x, y, 'bullet');
  }

  fire (x, y, enemy)
  {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityX(3000);
    this.setScale(0.2);

    this.scene.physics.add.collider(this,  enemy, (self, enemyFire)=>{
      const originalBugTint = enemyFire.tint;
      enemyFire.tint = 0xff0000;
      this.hitTimer = this.scene.time.delayedCall(50, () => {
        enemyFire.tint = originalBugTint;
        enemyFire.setVisible(false);
        enemyFire.setActive(false);
        self.setActive(false);
        self.setVisible(false);
        this.scene.physics.world.disable(self);
        self.setVelocityX(0);
      }, [], this.scene);
      this.scene.increasePoints(1)
    });
  }

  preUpdate (time, delta)
  {
    super.preUpdate(time, delta);

    if (this.x <= -32)
    {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
