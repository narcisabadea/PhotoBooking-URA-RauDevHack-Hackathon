import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        name: 'App',
        component: App,
        redirect: 'Home'
      },
      {
        path: '/Home',
        name: 'Home',
        component: Home
      }]
    })  