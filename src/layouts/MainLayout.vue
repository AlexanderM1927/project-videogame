<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Fight game
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'

import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
defineIonPhaser(window);

export default defineComponent({
  name: 'MainLayout',
  setup () {

    return {
    }
  }
})
</script>
