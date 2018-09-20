const SET_LETTERS_REGISTERED = (state, objectArray) => {
  state.letters_registered = objectArray
}

const SET_LETTER_EDIT = (state, object) => {
  state.letter_current_edit = object
}

export default {
  SET_LETTERS_REGISTERED,
  SET_LETTER_EDIT
}