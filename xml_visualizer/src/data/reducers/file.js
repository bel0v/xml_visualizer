import * as types from '../actions/constants'

export default (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_FILE_SUCCESS:
      const { doc, ...attrs} = action.payload
      return {
        doc,
        attrs,
      }
    case types.LOAD_FILE_FAILURE:
      return {
        doc: action.payload
      }
    case types.RESET_FILE:
      return {}
    case types.FILE_PATCH:
      const newElement = action.payload
      const id = newElement.getAttribute('__graph_id')
      const oldElement = state.doc.querySelectorAll(`[__graph_id="${id}"]`)[0]
      oldElement.parentNode.replaceChild(newElement, oldElement)
      return state
    default:
      return state
  }
}
