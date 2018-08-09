const SET_DESTINATION_OR_REASON = (state, objectArray) => {
  state.destination_or_reason = objectArray
}

const SET_ALL_RESPONSIBLE = (state, objectArray) => {
  state.all_responsible = objectArray
}

export default {
  SET_DESTINATION_OR_REASON,
  SET_ALL_RESPONSIBLE
}