import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Sidebar from './views/Sidebar.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        sidebar: Sidebar,
        default: Home
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        sidebar: Sidebar,
        default: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
});
