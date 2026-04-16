import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import ListBag from '../views/ListBag.vue'
import MainQuest from '../views/MainQuest.vue'
import XtallView from '../views/XtallView.vue'
import CalculatorMQ from '../views/CalculatorMQ.vue'
import BSCalculator from '../views/BSCalculator.vue'
import XtallDetail from '../views/XtallDetail.vue'
import XtallAdvancedSearch from '../views/XtallAdvancedSearch.vue'
import EventList from '../views/EventList.vue'
import LevelingGuide from '../views/LevelingGuide.vue'
import Favorite from '../views/FavoriteView.vue'
import ErrorView from '../views/ErrorView.vue'


const routes = [
  {
      path: '/',
      name: 'home',
      component: HomeView
    },
  {
    path: '/bag-list',
    name: 'bag',
    component: ListBag
  },
  {
    path: '/mq-list',
    name: 'mainquest',
    component: MainQuest
  },
  {
    path: '/mq-calc',
    name: 'mqcalc',
    component: CalculatorMQ
  },
  {
    path: '/bs-calc',
    name: 'bs-calc',
    component: BSCalculator
  },

  // ================= XTALL =================
  {
    path: '/xtall',
    name: 'xtall',
    component: XtallView
  },
  {
    path: '/xtall/advanced',
    name: 'xtall-advanced',
    component: XtallAdvancedSearch
  },
  {
    path: '/xtall/:id(\\d+)',
    name: 'xtall-detail',
    component: XtallDetail,
    props: true
  },
  // ================= OTHER =================
  {
      path: '/event',
      name: 'Event-List',
      component: EventList
    },
    {
      path: '/lvling',
      name: 'Leveling-Guide',
      component: LevelingGuide
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite
    },
    {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // MASUKKAN VARIABEL ROUTES DI SINI
  routes: routes, 
  
  // EFEK SCROLL KE ATAS
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})
export default router
