import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import Game from '@/page/Game'
import Score from '@/page/Score'
import ScoreCreate from '@/page/ScoreCreate'
import Face from '@/page/Face'
import Err404 from '@/page/error/404'
import Err500 from '@/page/error/500'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/score',
      name: 'Score',
      component: Score
    },
    {
      path: '/scoreCreate',
      name: 'ScoreCreate',
      component: ScoreCreate
    },
    {
      path: '/face',
      name: 'Face',
      component: Face
    },
    {
      path: '/404',
      name: '404',
      component: Err404
    },
    {
      path: '/500',
      name: '500',
      component: Err500
    }
  ]
})
