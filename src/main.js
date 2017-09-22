import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import App from './App'
import vmodal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(VueScrollTo)
Vue.use(vmodal)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
