const getImmobileData = async ({commit}, queryParams) => {

  try {
    const res = await http.get('sicadi/query/immobile-data', queryParams)
    if (res.data) {
      commit('SET_IMMOBILE_DATA', res.data)
    }

    return res

  } catch (e) {
    return e
  }

}

export default {
  getImmobileData
}