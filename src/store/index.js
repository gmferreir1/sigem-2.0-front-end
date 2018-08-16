import Vue from 'vue'
import Vuex from 'vuex'

import Auth from '@/bundles/systemAdmin/user/store'
import Sicadi from '@/bundles/sicadi/store'
import Termination from '@/bundles/termination/store'
import Register from '@/bundles/register/store'

const modules = {
  Auth,
  Sicadi,
  Termination,
  Register
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})
