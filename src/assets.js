import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/pt-br'

/*
 * Element UI
 */
require('../node_modules/element-ui/lib/theme-chalk/index.css')
Vue.use(ElementUI, { locale })

/*
 * Validação de formularios
 */
const SimpleVueValidation = require('simple-vue-validator')
window.Validator = SimpleVueValidation.Validator
Vue.use(SimpleVueValidation)



/*
 * CollectJs
 */
window.collect = require('collect.js')