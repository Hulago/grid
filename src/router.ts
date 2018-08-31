import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Sidebar from './views/Sidebar.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Home from './views/Home.vue';
import AppLayout from './AppLayout.vue';
import CenterLayout from './CenterLayout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/app',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          components: {
            sidebar: Sidebar,
            default: Dashboard
          },
          meta: { requiresAuth: false }
        },
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          components: {
            sidebar: Sidebar,
            default: () => import(/* webpackChunkName: "about" */ './views/About.vue')
          },
          meta: { requiresAuth: false }
        }
      ]
    },
    {
      path: '/auth',
      component: CenterLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue')
        }
      ]
    }
  ]
});
