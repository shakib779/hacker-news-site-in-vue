import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import { router } from './router/index'

Vue.config.productionTip = false

/**
 * Params (timeInUnix): Unix Format time
 * Calculate the time difference between current time and given time
 */
Vue.filter('getTimeDiffrence', (timeInUnix) => {
  let diff = Math.round((Date.now() / 1000)) - timeInUnix;
  const day = 24 * 60 * 60;
  const hour = 60 * 60;
  const minutes = 60;
  let string = "";

  if (diff >= day) {
    diff = Math.round(diff / day);
    string = " day";
  } else if (diff >= hour) {
    diff = Math.round(diff / hour);
    string = " hour";
  } else if (diff >= minutes) {
    diff = Math.round(diff / minutes);
    string = " minute";
  } else {
    string = " second";
  }

  if (diff > 1)
    string += "s";
  return diff.toString() + string;

});


new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
