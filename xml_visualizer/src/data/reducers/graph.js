import * as types from '../actions/constants'
import { Graph } from 'data/models/Graph'

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
    default:
      return state
  }
}
