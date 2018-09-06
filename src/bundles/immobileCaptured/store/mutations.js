const SET_LIST_IMMOBILE_CAPTURED = (state, objectArray) => {
  state.all_list_report_immobile_captured = objectArray
}

const SET_RESPONSIBLE_FOR_FILTER = (state, objectArray) => {
  state.responsible_for_filter = objectArray
}

const SET_EDIT_CURRENT_REPORT_IMMOBILE_CAPTURED = (state, object) => {
  state.edit_current_report_immobile_captured = object
}

const CLEAR_EDIT_CURRENT_REPORT_IMMOBILE_CAPTURED = (state, object) => {
  state.edit_current_report_immobile_captured = {}
}

export default {
  SET_LIST_IMMOBILE_CAPTURED,
  SET_RESPONSIBLE_FOR_FILTER,
  SET_EDIT_CURRENT_REPORT_IMMOBILE_CAPTURED,
  CLEAR_EDIT_CURRENT_REPORT_IMMOBILE_CAPTURED
}