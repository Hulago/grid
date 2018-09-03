import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/app/dashboard/dashboard.view.vue';
import Sidebar from './views/Sidebar.vue';
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
            default: () => import(/* webpackChunkName: "dashboard" */ './views/app/dashboard/dashboard.view.vue')
          },
          meta: { requiresAuth: true }
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
          meta: { requiresAuth: true }
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
          component: () => import(/* webpackChunkName: "login" */ './views/auth/login/login.view.vue'),
          meta: { requiresAuth: false }
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import(/* webpackChunkName: "signup" */ './views/auth/signup/signup.view.vue'),
          meta: { requiresAuth: false }
        }
      ]
    }
  ]
});
