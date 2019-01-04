import Vue from 'vue';
import Router from 'vue-router';
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
          redirect: 'dashboard',
          meta: { requiresAuth: true }
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          components: {
            sidebar: () =>
              import(/* webpackChunkName: "dashboard" */ './views/app/dashboard/dashboard-sidebar.view.vue'),
            default: () => import(/* webpackChunkName: "dashboard" */ './views/app/dashboard/dashboard.view.vue')
          },
          meta: { requiresAuth: true }
        },
        {
          path: 'academic-year',
          name: 'academic-year',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          components: {
            sidebar: () =>
              import(// tslint:disable-next-line:max-line-length
              /* webpackChunkName: "academic-year" */ './views/app/academic-year/academic-year-sidebar.view.vue'),
            default: () =>
              import(/* webpackChunkName: "academic-year" */ './views/app/academic-year/academic-year.view.vue')
          },
          meta: { requiresAuth: true }
        },
        {
          path: 'courses',
          name: 'courses',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          components: {
            sidebar: () => import(/* webpackChunkName: "courses" */ './views/app/courses/courses-sidebar.view.vue'),
            default: () => import(/* webpackChunkName: "courses" */ './views/app/courses/courses.view.vue')
          },
          meta: { requiresAuth: true }
        },
        {
          path: 'exams',
          name: 'exams',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          components: {
            sidebar: () => import(/* webpackChunkName: "exams" */ './views/app/exams/exams-sidebar.view.vue'),
            default: () => import(/* webpackChunkName: "exams" */ './views/app/exams/exams.view.vue')
          },
          meta: { requiresAuth: true }
        },
        {
          path: 'classes',
          name: 'classes',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          components: {
            sidebar: () => import(/* webpackChunkName: "classes" */ './views/app/classes/classes-sidebar.view.vue'),
            default: () => import(/* webpackChunkName: "classes" */ './views/app/classes/classes.view.vue')
          },
          meta: { requiresAuth: true }
        },
        {
          path: 'corrections',
          name: 'corrections',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          components: {
            sidebar: () =>
              import(/* webpackChunkName: "corrections" */ './views/app/corrections/corrections-sidebar.view.vue'),
            default: () => import(/* webpackChunkName: "corrections" */ './views/app/corrections/corrections.view.vue')
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
