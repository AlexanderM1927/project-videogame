import { Enemy } from './enemy'

export class EnemyArcadeGroup extends Phaser.Physics.Arcade.Group {
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 3,
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
