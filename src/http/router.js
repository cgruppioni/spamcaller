// https://github.com/prograhammer/vue-pizza/wiki/Routing

import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router)

/**
* Guard the route from unauthorized users.
*
* @param  {Route}    to   The route we want to access.
* @param  {Route}    from The route from which we are coming from.
* @param  {Function} next Callback for passing a route to be called next.
* @return {void}
*/
function guardRoute (to, from, next) {
  // work-around to get to the Vuex store (as of Vue 2.0)
  const auth = router.app.$options.store.state.auth

  if (!auth.isLoggedIn) {
    next({path: '/login', query: { redirect: to.fullPath }})
  } else {
    next()
  }
}

/**
* The Router instance containing all the routes for the application.
*/
const router = new Router({
  base: '/app',
  mode: 'hash',
  routes: routes.map(route => ({
    name: route.name,
    path: route.path,
    component: route.component,
    beforeEnter: route.isPublic ? null : guardRoute
  }))
})

export default router 