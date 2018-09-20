/**
 * Pega os nomes das cartas para mostrar no select
 * @param commit
 * @returns {Promise<*>}
 */
const getLettersRegistered = async ({commit}) => {

  try {
    const res = await http.get('control-letter/query-letters-registered')
    commit('SET_LETTERS_REGISTERED', res.data)
    return res
  } catch (e) {
    return e
  }

}

/**
 * Pega uma carta
 * @param commit
 * @param id
 * @returns {Promise<*>}
 */
const getLetter = async ({commit}, id) => {

  try {
    const res = await http.get(`control-letter/${id}`)
    commit('SET_LETTER_EDIT', res.data)
    return res
  } catch (e) {
    return e
  }

}

export default {
  getLettersRegistered,
  getLetter
}