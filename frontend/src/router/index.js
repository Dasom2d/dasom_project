import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/test/IndexPage'
import LoginPage from '@/components/test/LoginPage'

import MovieIndexPage from '@/components/movie/MovieListPage'
import MovieShowPage from '@/components/movie/DetailMoviePage'

import map from '@/components/map/map'
import header from '@/components/header/header'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/loginPage',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/movie',
      name: 'MovieIndexPage',
      component: MovieIndexPage
    },
    {
      path: '/movie/:id',
      name: 'MovieShowPage',
      component: MovieShowPage
    },
    {
      path: '/',
      name: 'indexVIew',
      components: {
        header,
        map
      }
    }
  ]
})