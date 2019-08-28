import * as types from '../actions/constants'
import { Graph } from 'data/models/Graph'
import { walkXMl } from 'utils'

const defaultState = {
  model: Graph(),
  isBuilt: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.BUILD_GRAPH_SUCCESS:
      return {
        model: action.payload,
        isBuilt: true
      }
    case types.RESET_GRAPH:
      state.model.cleanUp()
      return defaultState
    case types.GRAPH_PATCH:
      const newElement = action.payload
      const node = state.model.nodes.get(newElement.id)
      newElement.level = node.level
      // remove old subtree
      state.model.removeSubtree(newElement.id)
      // add new subtree
      walkXMl(newElement, null, state.model.addNode)
      return state
    default:
      return state
  }
}
