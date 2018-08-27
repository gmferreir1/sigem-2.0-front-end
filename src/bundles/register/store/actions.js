/**
 * Lista os atendentes
 * @param commit
 * @param queryParams
 * @returns {Promise<*>}
 */
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

/**
 * Retorna o ultimo atendente
 * @returns {Promise<*>}
 */
const getNextAttendance  = async () => {

  try {
    return await http.get('register/reserve-contract/score/next-attendance')
  } catch (e) {
    return e
  }

}

/**
 * Consulta as reserves no sistema
 * @returns {Promise<*>}
 */
const getReserveContracts = async ({commit}, queryParams) => {

  try {
    const res = await http.get('register/reserve-contract', queryParams)

    if (!queryParams) {
      commit('SET_RESERVE_CONTRACTS', res.data)
    }

    if (queryParams && !queryParams.params.print) {
      commit('SET_RESERVE_CONTRACTS', res.data)
    }

    return res

  } catch (e) {
    return e
  }
}

/**
 * Pega dados de uma reserva
 * @param reserveId
 * @returns {Promise<*>}
 */
const getReserveContract = async ({commit}, reserveId) => {

  try {
    const res = await http.get(`register/reserve-contract/${reserveId}`)
    commit('SET_EDIT_CONTRACT_CURRENT', res.data.reserve)
    commit('SET_HISTORIC_CONTRACT', res.data.historic)
    return res

  } catch (e) {
    return e
  }
}

/**
 * Pega os responsáveis pelo filtro
 * @returns {Promise<*>}
 */
const getResponsibleForFilter = async ({commit}) => {

  try {
    const res = await http.get('register/reserve-contract/query/responsible-for-filter')

    if (res.data) {
      commit('SET_RESPONSIBLE_CONTRACT_FILTER', res.data)
    }

    return res
  } catch (e) {
    return e
  }

}

/**
 * Pega os motivos de cancelamento
 * @returns {Promise<*>}
 */
const getReasonsCancel = async ({commit}) => {

  try {
    const res = await http.get('register/reserve-contract/reason-cancel')

    if (res.data) {
      commit('SET_REASONS_CANCEL', res.data)
    }

    return res
  } catch (e) {
    return e
  }

}

export default {
  getAttendantsScore,
  getNextAttendance,
  getReserveContracts,
  getReserveContract,
  getResponsibleForFilter,
  getReasonsCancel
}