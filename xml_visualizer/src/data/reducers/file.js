import * as types from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_FILE_SUCCESS:
      return {
        result: action.payload
      }
    case types.LOAD_FILE_FAILURE:
      return {
        result: action.payload
      }
    case types.RESET_FILE:
      return {}
    default:
      return state
  }
}
