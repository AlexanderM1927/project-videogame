<template>
  <q-page>
    <div class="main-container">
      <div class="game-container">
        <div @click="initializeGame" v-if="!initialize">
          <a href="#1"  class="btn btn-start">Initialize</a>
        </div>
        <ion-phaser
          v-bind:game.prop='game'
          v-bind:initialize.prop='initialize'
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import Phaser from 'phaser'
defineIonPhaser(window);

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      initialize: false,
      game: {
        width: "100%",
        height: "100%",
        type: Phaser.AUTO,
        scene: {
          init() {
            this.cameras.main.setBackgroundColor("#24252A");
          },
          create() {
            this.helloWorld = this.add.text(
              this.cameras.main.centerX,
              this.cameras.main.centerY,
              "Hello World",
              { font: "1rem Arial",  fill: "#ffffff" }
            );
            this.helloWorld.setOrigin(0.5);
          },
          update() {
            this.helloWorld.angle += 1;
          }
        }
      }
    };
  },
  methods: {
    initializeGame() {
      this.initialize = true;
    }
  }
})
</script>
