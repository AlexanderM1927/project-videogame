<template>
  <q-page>
    <div class="main-container">
      <div class="game-container">
        <div @click="initializeGame" v-if="!initialize">
          <a href="#1"  class="btn btn-start">Last Killed Start</a>
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
import Phaser from 'phaser'
import { Game } from '../core/scenes/game.js';
import { GameOver } from '../core/scenes/gameover';

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      initialize: false,
      game: {
        width: "100%",
        height: "100%",
        type: Phaser.AUTO,
        scene: [Game, GameOver],
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
            gravitiy: 400
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
