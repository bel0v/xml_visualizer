import * as types from '../actions/constants'
const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.NODE_SELECT:
      return action.payload
    case types.NODE_DESELECT:
      return defaultState
    default:
      return state
  }
}
