import { combineReducers } from 'redux'
import fileReducer from './file'
import graphReducer from './graph'

export default combineReducers({
  file: fileReducer,
  graph: graphReducer
})
