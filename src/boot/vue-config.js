import { boot } from 'quasar/wrappers'
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';

export default boot(({ app }) => {

  app.config.productionTip = false;
  app.config.ignoredElements = [/ion-\w*/];

  defineIonPhaser(window);
})
