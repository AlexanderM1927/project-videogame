import { Enemy } from './enemy'

export class EnemyArcadeGroup extends Phaser.Physics.Arcade.Group {
    constructor (scene, enemiesQuentity = 3)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
          frameQuantity: enemiesQuentity,
          key: 'alien',
          active: false,
          visible: false,
          classType: Enemy
        });
    }

    spawnEnemy (x, y, player)
    {
      let enemy = this.getFirstDead(false);

      if (enemy)
      {
        enemy.spawn(x, y, player);
      }
    }
}
