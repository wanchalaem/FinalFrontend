import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import "@mdi/font/css/materialdesignicons.min.css"
import App from './App.vue'
import router from './router/'
import store from './store/'
import "@/assets/custom.css"
import 'animate.css'
Vue.config.productionTip = false


new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')
