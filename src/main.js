import Vue from 'vue'
import './plugins/vuetify'
import router from '@/router'
import store from '@/store'
import * as firebase from '@/firebase'
import Vuex from 'vuex'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  router,
  firebase,
  store,
  render: h => h(App),
}).$mount('#app')
