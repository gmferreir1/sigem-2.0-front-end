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

const SET_CONTRACTS_TRANSFER = (state, objectArray) => {
  state.contracts_transfer = objectArray
}

const SET_EDIT_CONTRACT_TRANSFER_CURRENT = (state, object) => {
  state.contract_transfer_edit_current = object
}

const SET_HISTORIC_CONTRACT_TRANSFER = (state, objectArray) => {
  state.historic_contract_transfer = objectArray
}

const SET_RESPONSIBLE_CONTRACT_TRANSFER_FILTER = (state, objectArray) => {
  state.responsible_filter_contracts_transfer = objectArray
}

const CLEAN_EDIT_CONTRACT_TRANSFER_CURRENT = (state) => {
  state.contract_transfer_edit_current = {}
}

const CLEAN_HISTORIC_CONTRACT_TRANSFER = (state) => {
  state.historic_contract_transfer = []
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
  SET_REASONS_TRANSFER,
  SET_CONTRACTS_TRANSFER,
  SET_EDIT_CONTRACT_TRANSFER_CURRENT,
  SET_HISTORIC_CONTRACT_TRANSFER,
  SET_RESPONSIBLE_CONTRACT_TRANSFER_FILTER,
  CLEAN_EDIT_CONTRACT_TRANSFER_CURRENT,
  CLEAN_HISTORIC_CONTRACT_TRANSFER
}