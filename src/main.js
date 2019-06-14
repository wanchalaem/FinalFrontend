import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import "@mdi/font/css/materialdesignicons.min.css"
import App from './App.vue'
import router from './router/'
// import store from './store/'
import store from './store/vuex';
import "@/assets/custom.css"
import 'animate.css'
Vue.config.productionTip = false
import ImageUploader from 'vue-image-upload-resize'
Vue.use(ImageUploader);

import VueNumberInput from '@chenfengyuan/vue-number-input';
Vue.use(VueNumberInput);

new Vue({
  router,
  store: store,
  
  render: h => h(App)
}).$mount('#app')