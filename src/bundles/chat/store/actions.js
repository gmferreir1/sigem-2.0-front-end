const getUsersChat = async ({commit}) => {

  try {
    const res = await http.get('chat/transaction-actions/all-users')
    commit('SET_USERS_CHAT', res.data)

    return res

  } catch (e) {
    reject(e)
  }

}

const getConversations = async ({commit}, queryParams) => {

  try {
    const res = await http.get('chat/conversations', queryParams)

    commit('SET_MESSAGES', res.data)

    return res

  } catch (e) {
    reject(e)
  }

}

const checkUsersOnline = async () => {

  try {
    const res = await http.get('chat/transaction-actions/check-users-online')

    return res

  } catch (e) {
    reject(e)
  }

}




export default {
  getUsersChat,
  getConversations,
  checkUsersOnline
}