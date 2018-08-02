import Vue from 'vue'
import Router from 'vue-router'
const checkIsLogged = require('@/util/checkIsLogged')


/*
 * Autenticação component
 */
import Auth from '@bundles/auth/page/Main'


/*
 * Administração do Sistema
 */
import SystemAdmin from '@bundles/systemAdmin/Main'
import SystemAdmin_Dashboard from '@bundles/systemAdmin/dashboard/page/Main'
import SystemAdmin_User from '@bundles/systemAdmin/user/page/Main'
import SystemAdmin_UpdateDatabase from '@bundles/systemAdmin/updateDatabase/page/Main'

/*
 * Dashboard
 */
import Dashboard from '@/bundles/dashboard/page/Main'

/*
 * Rescisão
 */
import Termination from '@bundles/termination/Main'
import Termination_Contract from '@bundles/termination/contract/page/Main'


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
    },
    /**
     * Rescisão de contrato
     */
    {
      path: '/termination',
      name: 'termination',
      component: Termination,
      children: [
        {
          path: 'contract',
          name: 'termination.Contract',
          component: Termination_Contract
        }
      ]
    },
    /**
     * Administração do sistema
     */
    {
      path: '/system-admin',
      name: 'systemAdmin',
      component: SystemAdmin,
      children: [
        {
          path: 'dashboard',
          name: 'systemAdmin.Dashboard',
          component: SystemAdmin_Dashboard
        },
        {
          path: 'user',
          name: 'systemAdmin.User',
          component: SystemAdmin_User
        },
        {
          path: 'update-database',
          name: 'systemAdmin.UpdateDatabase',
          component: SystemAdmin_UpdateDatabase
        }
      ]
    }
  ]
})

// protected route
router.beforeEach((to, from, next) => {

  if (to.name != 'auth' && checkIsLogged.check()) {
    next()
  } else if (to.name === 'auth') {
    next()
  } else {
    next(false)
  }

})

export default router
