import * as types from './constants'
import { store } from '../store'

export const selectNode = (id) => (dispatch) => {
  const { file } = store.getState()
  const element = file.doc.querySelectorAll(`[__graph_id="${id}"]`)[0]
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
