import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from './views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Rick And Morty',
      metaTags: [
        {
          name: 'description',
          content: 'A Rick And Morty example app.'
        },
        {
          property: 'og:description',
          content: 'A Rick And Morty example app.'
        }
      ]
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
