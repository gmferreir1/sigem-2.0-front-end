import Vue from 'vue'
import Vuex from 'vuex'

import Auth from '@/bundles/systemAdmin/user/store'

const modules = {
  Auth
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})
