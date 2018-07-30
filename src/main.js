import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


Vue.prototype.$systemVersion = '0.0.1'

// Event Bus
import EventBus from '@/plugins/event-bus'
Vue.use(EventBus)

require('./assets_template')
require('./assets')
window._notification = require('./util/notification')

window.URL_API = process.env.NODE_ENV === 'development' ? 'http://localhost:90' : 'http://10.0.10.95:86'

window.http = require('@/util/http')

// interceptor
require('@/util/interceptor')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
