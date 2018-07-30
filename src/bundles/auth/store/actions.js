const getAllUsers = async ({commit}, queryParams) => {

  try {
    const res = await http.get('users', queryParams)
    return res
  } catch (e) {
    return Promise(e)
  }

}

export default {
  getAllUsers
}