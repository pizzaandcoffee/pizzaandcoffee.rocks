import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import App from './App'
// import router from './router'

Vue.config.productionTip = false

Vue.use(VueScrollTo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
