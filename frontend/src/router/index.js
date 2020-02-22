import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/test/IndexPage'
import LoginPage from '@/components/test/LoginPage'
import MovieListPage from '@/components/movie/MovieListPage'
import DetailMoviePage from '@/components/movie/DetailMoviePage'
import UploadMoviePage from '@/components/movie/UploadMoviePage'
import map from '@/components/map/map'
import header from '@/components/header/header'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexView',
      components: {
        header,
        map
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/movie',
      name: 'MovieListPage',
      component: MovieListPage
    },
    {
      path: '/movie/:id',
      name: 'DetailMoviePage',
      component: DetailMoviePage
    },
    {
      path: '/upload',
      name: 'UploadMoviePage',
      component: UploadMoviePage
    },
    {
      path: '/index',
      name: 'IndexPage',
      component: IndexPage
    }
  ]
})
