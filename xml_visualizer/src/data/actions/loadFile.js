import * as types from './constants'

export const loadFileStart = () => dispatch => {
  dispatch({
    type: types.LOAD_FILE_START
  })
}
export const loadFileSuccess = result => dispatch => {
  dispatch({
    type: types.LOAD_FILE_SUCCESS,
    payload: result
  })
}
export const loadFileFailure = error => dispatch => {
  dispatch({
    type: types.LOAD_FILE_FAILURE,
    payload: { error }
  })
}
