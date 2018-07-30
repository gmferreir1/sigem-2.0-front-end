const toastr = require('toastr')
require('../../node_modules/toastr/build/toastr.min.css')
toastr.options.closeButton = true

const notification = {

  success: function (message) {
    if (!message) {
      message = 'Operação realizada !'
    }
    toastr.success(message, { timeOut: 2000 })
  },

  error: function (message, width = null) {
    if (!message) {
      message = 'Erro ao realizar operação !'
    }
    if (width == null) {
      toastr.error(message, { timeOut: 5000 })
    } else {
      toastr.error(message, { timeOut: 5000 }).css('width', width)
    }
  },

  warning: function (message, width = null) {
    if (!message) {
      message = 'Operação invalida !'
    }
    if (width == null) {
      toastr.warning(message, { timeOut: 5000 })
    } else {
      toastr.warning(message, { timeOut: 5000 }).css('width', width)
    }
  }
}

module.exports = notification
