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


/*
 * moment js
 */
window.moment = require('moment')


/*
 * Bootstrap Select Multiple
 */
require('../node_modules/bootstrap-multiselect/dist/js/bootstrap-multiselect')
require('../node_modules/bootstrap-multiselect/dist/css/bootstrap-multiselect.css')


/*
 * Vue the mask
 */
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

/*
 * v-money
 */

import money from 'v-money'
Vue.use(money, {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
})


/*
 * Chosen
 */
require('../node_modules/chosen-js/chosen.jquery.min')


/*
 * Lodash
 */
window._ = require('lodash')


/*
 * Numeral
 */
window.numeral = require('numeral')
// load a locale
window.numeral.register('locale', 'pt-br', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  currency: {
    symbol: 'R$'
  }
})
numeral.locale('pt-br')


/*
 * Froala Editor
 */
require('../node_modules/froala-editor/js/froala_editor.pkgd.min')
require('../node_modules/froala-editor/js/languages/pt_br')
require('../node_modules/froala-editor/css/froala_editor.pkgd.min.css')
require('../node_modules/font-awesome/css/font-awesome.css')
require('../node_modules/froala-editor/css/froala_style.min.css')
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)


/*
 * HighCharts
 */
window.Highcharts = require('highcharts')

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts)

Highcharts.setOptions({
  lang: {
    decimalPoint: ',',
    thousandsSep: '.'
  }
})


/*
 * Pusher
 */
const vuePuser = require('vue-pusher')

Vue.use(vuePuser, {
  api_key: '2055475654b3ab243607',
  options: {
    cluster: 'eu',
    encrypted: true,
  }
})