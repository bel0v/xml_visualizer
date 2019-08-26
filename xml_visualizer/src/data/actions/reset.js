import * as types from './constants'

export const resetAll = () => dispatch => {
  dispatch({ type: types.RESET_GRAPH })
  dispatch({ type: types.RESET_FILE })
  dispatch({ type: types.NODE_DESELECT })
}
