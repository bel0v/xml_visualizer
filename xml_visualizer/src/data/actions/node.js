import * as types from './constants'
import { store } from '../store'

export const selectNode = (id) => (dispatch) => {
  const { file } = store.getState()
  const element = file.result.getElementById(id)
  dispatch({
    type: types.NODE_SELECT,
    payload: {id, element},
  })
}

export const deselectNode = () => (dispatch) => {
  dispatch({
    type: types.NODE_DESELECT,
  })
}
