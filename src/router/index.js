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
import Termination_DeadFile from '@bundles/termination/deadFile/page/Main'
import Immobile_Release from '@bundles/termination/immobileRelease/page/Main'

/*
 * Cadastro
 */
import Register from '@bundles/register/Main'
import Register_Reserve from '@bundles/register/reserve/page/Main'

/*
 * Financeiro
 */
import Financial from '@bundles/financial/Main'
import Financial_ContractCelebrated from '@bundles/financial/contractCelebrated/page/Main'



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
        },
        {
          path: 'dead-file',
          name: 'termination.DeadFile',
          component: Termination_DeadFile
        },
        {
          path: 'immobile-release',
          name: 'termination.ImmobileRelease',
          component: Immobile_Release
        }
      ]
    },
    /**
     * Cadastro
     */
    {
      path: '/register',
      name: 'register',
      component: Register,
      children: [
        {
          path: 'reserve',
          name: 'register.Reserve',
          component: Register_Reserve
        }
      ]
    },
    /**
     * Financeiro
     */
    {
      path: '/financial',
      name: 'financial',
      component: Financial,
      children: [
        {
          path: 'contract-celebrated',
          name: 'financial.ContractCelebrated',
          component: Financial_ContractCelebrated
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
