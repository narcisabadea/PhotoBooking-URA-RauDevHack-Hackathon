import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Home from '@/components/Home'
import Test from '@/components/Test'
import CalendarAcceptate from '@/components/Fotograf/CalendarAcceptate'
import CereriAcceptDecline from '@/components/Fotograf/CereriAcceptDecline'
import Istoric from '@/components/Fotograf/Istoric'
import ProfilFotograf from '@/components/Fotograf/ProfilFotograf'
import ProfilClient from '@/components/Client/ProfilClient'
import Favoriti from '@/components/Client/Favoriti'
import ListeUseriFotografi from '@/components/Admin/ListeUseriFotografi'
import Statistici from '@/components/Admin/Statistici'

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
      },
      {
        path: '/CalendarAcceptate',
        name: 'CalendarAcceptate',
        component: CalendarAcceptate
      },
      {
        path: '/CereriAcceptDecline',
        name: 'CereriAcceptDecline',
        component: CereriAcceptDecline
      },
      {
        path: '/Istoric',
        name: 'Istoric',
        component: Istoric
      },
      {
        path: '/ProfilFotograf',
        name: 'ProfilFotograf',
        component: ProfilFotograf
      },
      {
        path: '/ProfilClient',
        name: 'ProfilClient',
        component: ProfilClient
      },
      {
        path: '/Favoriti',
        name: 'Favoriti',
        component: Favoriti
      },
      {
        path: '/ListeUseriFotografi',
        name: 'ListeUseriFotografi',
        component: ListeUseriFotografi
      },
      {
        path: '/Statistici',
        name: 'Statistici',
        component: Statistici
      },
      {
        path: '/Test',
        name: 'Test',
        component: Test
      }
    ]
  })  