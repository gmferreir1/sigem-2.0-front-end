const saveContractCelebrated = async ({}, data) => {

  try {
    const res = await http.post('financial/contract-celebrated', data)
    return res
  } catch (e) {
    return e
  }

}

const getContractsCelebrated = async ({commit}, queryParams) => {

  try {
    const res = await http.get('financial/contract-celebrated', queryParams)
    commit('SET_CONTRACTS_CELEBRATED', res.data)
    return res
  } catch (e) {
    return e
  }

}

export default {
  saveContractCelebrated,
  getContractsCelebrated
}