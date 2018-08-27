import Vue from 'vue'
import Vuex from 'vuex'

import Auth from '@/bundles/systemAdmin/user/store'
import Sicadi from '@/bundles/sicadi/store'
import Termination from '@/bundles/termination/store'
import Register from '@/bundles/register/store'
import Financial from '@/bundles/financial/store'
import Notification from '@/bundles/notification/store'

const modules = {
  Auth,
  Sicadi,
  Termination,
  Register,
  Financial,
  Notification
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})
