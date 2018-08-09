const getAllUsers = async ({commit}, queryParams) => {

  try {
    const res = await http.get('user', queryParams)

    if (res.data) {
      commit('SET_USERS', res.data.data)
    }

    return res

  } catch (e) {
    return e
  }

}

export default {
  getAllUsers
}