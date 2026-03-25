import { createRouter, createWebHashHistory } from 'vue-router'


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
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
