import Vue from 'vue'
import Router from 'vue-router'
const checkIsLogged = require('@/util/checkIsLogged')


/*
 * Autenticação component
 */
import Auth from '@bundles/auth//page/Main'


/*
 * Dashboard
 */
import Dashboard from '@/bundles/dashboard/page/Main'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})

// protected route
router.beforeEach((to, from, next) => {

  console.log(to)
  if (to.name != 'auth' && checkIsLogged.check()) {
    next()
  } else if (to.name === 'auth') {
    next()
  } else {
    next(false)
  }

})

export default router
