// https://github.com/prograhammer/vue-pizza/wiki/Routing

/**
 * Every route becomes a chunk, loaded only when used.
 * Reduces size of initial App load.
 */
const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/features/login/main.vue'),
    title: 'Login',
    layout: 'NoAuthLayout',
    isPublic: true
  },
  {
    name: 'dashboard',
    path: '/',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/features/dashboard/main.vue'),
    title: 'Dashboard',
    layout: 'DefaultLayout',
    isPublic: false
  },
  {
    name: 'account',
    path: '/account',
    component: () => import(/* webpackChunkName: "account" */ '@/features/account/main.vue'),
    title: 'Account',
    layout: 'DefaultLayout',
    isPublic: false
  }
]