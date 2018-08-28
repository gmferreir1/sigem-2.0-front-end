const SET_ATTENDANTS_SCORE = (state, objectArray) => {
  state.attendants_score = objectArray
}

const SET_RESERVE_CONTRACTS = (state, objectArray) => {
  state.reserve_contracts = objectArray
}

const SET_RESPONSIBLE_CONTRACT_FILTER = (state, objectArray) => {
  state.responsible_filter_contracts = objectArray
}

const SET_EDIT_CONTRACT_CURRENT = (state, objectArray) => {
  state.contract_edit_current = objectArray
}

const CLEAR_EDIT_CONTRACT_CURRENT = (state) => {
  state.contract_edit_current = []
}

const SET_HISTORIC_CONTRACT = (state, objectArray) => {
  state.historic_contract = objectArray
}

const CLEAN_HISTORIC_CONTRACT = (state) => {
  state.historic_contract = []
}

const SET_REASONS_CANCEL = (state, objectArray) => {
  state.reasons_cancel = objectArray
}

/**************************************|
 ****** Modulo de transferencia *******|
 **************************************|
 */

const SET_ATTENDANTS_SCORE_TRANSFER = (state, objectArray) => {
  state.attendants_score_transfer = objectArray
}


const SET_REASONS_TRANSFER = (state, objectArray) => {
  state.reasons_transfer = objectArray
}


export default {
  SET_ATTENDANTS_SCORE,
  SET_RESERVE_CONTRACTS,
  SET_RESPONSIBLE_CONTRACT_FILTER,
  SET_EDIT_CONTRACT_CURRENT,
  CLEAR_EDIT_CONTRACT_CURRENT,
  SET_HISTORIC_CONTRACT,
  CLEAN_HISTORIC_CONTRACT,
  SET_REASONS_CANCEL,
  SET_ATTENDANTS_SCORE_TRANSFER,
  SET_REASONS_TRANSFER
}