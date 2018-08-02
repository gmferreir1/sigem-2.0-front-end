import Vue from 'vue'
import Vuex from 'vuex'

import Auth from '@/bundles/systemAdmin/user/store'
import Sicadi from '@/bundles/sicadi/store'
import Termination from '@/bundles/termination/store'

const modules = {
  Auth,
  Sicadi,
  Termination
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})
