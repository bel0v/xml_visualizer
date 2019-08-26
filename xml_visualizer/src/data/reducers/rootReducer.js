import { combineReducers } from 'redux'
import fileReducer from './file'
import graphReducer from './graph'
import nodeReducer from './node'

export default combineReducers({
  file: fileReducer,
  graph: graphReducer,
  node: nodeReducer,
})
