const checkIsLogged = {
  check: function () {

    const userLogged = localStorage.getItem('dataUserLogged') ? JSON.parse(localStorage.getItem('dataUserLogged')) : null
    if (!userLogged || !userLogged.access_token) {
      return false
    }
    return true

  }
}

module.exports = checkIsLogged