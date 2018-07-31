const getAllUsers = async ({commit}, queryParams) => {

  try {
    const res = await http.get('users', queryParams)
  } catch (e) {
    return e
  }

}

export default {
  getAllUsers
}