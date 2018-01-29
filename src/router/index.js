import Vue from 'vue'
import Router from 'vue-router'
import Rank from '.././components/rank/rank'
import Recommend from '.././components/recommend/recommend'
import Search from '.././components/search/search'
import Singer from '.././components/singer/singer'
import SingerDetails from '.././components/singer-details/singer-details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'rank'
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetails
        }
      ]
    }
  ]
})
