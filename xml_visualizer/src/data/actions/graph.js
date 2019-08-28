import * as types from './constants'

export const buildGraphStart = () => dispatch => {
  dispatch({
    type: types.BUILD_GRAPH_START
  })
}
export const buildGraphSuccess = result => dispatch => {
  dispatch({
    type: types.BUILD_GRAPH_SUCCESS,
    payload: result
  })
}

export const patchGraph = (element) => dispatch => {
  dispatch({
    type: types.GRAPH_PATCH,
    payload: element
  })
}