const SET_USERS_CHAT = (state, objectArray) => {
  state.users_chat = objectArray
}

const SET_MESSAGES = (state, objectArray) => {
  state.messages = objectArray
}

export default {
  SET_USERS_CHAT,
  SET_MESSAGES
}