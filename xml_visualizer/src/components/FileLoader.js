import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'data/actions'
import { Graph as GraphModel } from 'data/models/Graph'
import { loadFile, walkXMl } from 'utils'

const onFileLoad = (dispatch, graph) => (e) => {
  dispatch(actions.resetAll())
  dispatch(actions.loadFileStart())

  const newGraph = GraphModel({ depth: graph.depth })
  loadFile(e)
    .then((doc) => {
      dispatch(actions.loadFileSuccess(doc))
      dispatch(actions.buildGraphStart())
      walkXMl(doc, null, newGraph.addNode)
    })
    .then(() => {
      dispatch(actions.buildGraphSuccess(newGraph))
    })
}

export const FileLoader = connect()(({ dispatch, graph }) => {
  return <input type='file' onChange={onFileLoad(dispatch, graph)} />
})
