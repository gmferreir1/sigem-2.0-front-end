const saveDestinationOrReason = async ({commit, dispatch}, data) => {

  try {
    const res = await http.post('termination/destination-or-reason', data)
    return res
  } catch (e) {
    return Reject(e)
  }

}

const updateDestinationOrReason = async ({commit}, data) => {

  try {
    const res = await http.put(`termination/destination-or-reason/${data.id}`, data)
    return res
  } catch (e) {
    return Reject(e)
  }

}

const getDestinationAndReason = async ({commit}) => {

  try {
    const res = await http.get('termination/destination-or-reason')
    commit('SET_DESTINATION_OR_REASON', res.data)
    return res
  } catch (e) {
    return Reject(e)
  }

}

export default {
  saveDestinationOrReason,
  updateDestinationOrReason,
  getDestinationAndReason
}