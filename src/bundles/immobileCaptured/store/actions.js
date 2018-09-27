/**
 * Recupera a lista do relatorio de imoveis captados
 * @param commit
 * @param queryParams
 * @returns {Promise<*>}
 */
const getListReportImmobileCaptured = async ({commit}, queryParams) => {
  try {
    const res = await http.get('immobile-captured/report-list', queryParams)

    if (!queryParams.params.print) {
      commit('SET_LIST_IMMOBILE_CAPTURED', res.data.data)
    }

    return res

  } catch (e) {
    reject(e)
  }
}

const getResponsibleForFilter = async ({commit}) => {
  try {
    const res = await http.get('immobile-captured/report-list/query-responsible')
    commit('SET_RESPONSIBLE_FOR_FILTER', res.data)
  } catch (e) {
    return e
  }
}

const getReportImmobileCaptured = async ({commit}, id) => {
  try {
    const res = await http.get(`immobile-captured/report-list/${id}`)
    commit('SET_EDIT_CURRENT_REPORT_IMMOBILE_CAPTURED', res.data)
  } catch (e) {
    return e
  }
}


export default {
  getListReportImmobileCaptured,
  getResponsibleForFilter,
  getReportImmobileCaptured
}