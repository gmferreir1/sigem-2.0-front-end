const getAttendantsScore = async ({commit}, queryParams) => {

  try {
    const res = await http.get('register/reserve-contract/score', queryParams)
    if (res.data.data) {
      commit('SET_ATTENDANTS_SCORE', res.data.data)
    }

    return res

  } catch (e) {
    return e
  }

}

export default {
  getAttendantsScore
}