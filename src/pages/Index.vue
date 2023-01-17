<template>
  <q-page>
    <div class="main-container">
      <div class="game-container">
        <ion-phaser
          v-bind:game.prop='game'
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import Phaser from 'phaser'
import { Game } from '../scenes/game.js';
import { Congratulations } from '../scenes/congratulations.js';
import { Gameover } from '../scenes/gameover.js';
import { Menu } from '../scenes/menu.js';
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
        scene: [Menu, Game, Gameover, Congratulations],
        physics: {
          default: 'arcade',
          arcade: {
            debug: false
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
