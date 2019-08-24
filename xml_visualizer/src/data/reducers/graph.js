import * as types from '../actions/constants'
import { Graph } from 'data/models/Graph'

export default (state = Graph(), action) => {
  switch (action.type) {
    case types.BUILD_GRAPH_SUCCESS:
      return action.payload
    case types.RESET_GRAPH:
      state.cleanUp()
      return Graph()
    default:
      return state
  }
}
