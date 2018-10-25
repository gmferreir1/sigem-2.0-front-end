const setNotification = async ({commit}, message) => {

  commit('SET_NOTIFICATION', message)

}


export default {
  setNotification
}