import React, { useRef, useEffect } from 'react'
import vis from 'vis-network'
import { connect } from 'react-redux'
import * as actions from 'data/actions'


const onClick = (dispatch) => ({ nodes, edges }) => {
  if (nodes[0]) {
    dispatch(actions.selectNode(nodes[0]))
  } else {
    dispatch(actions.deselectNode())
  }
}


export const GraphRender = connect()(({ graph, options, dispatch }) => {
  const events = {
    click: onClick(dispatch)
  }

  const container = useRef(null)
  useEffect(() => {
    const data = {
      nodes: graph.nodes,
      edges: graph.edges,
    }
    graph.network = new vis.Network(container.current, data, options)
    Object.keys(events).forEach((event) => {
      graph.network.on(event, events[event])
    })
  })
  return <div ref={container} style={{ height: '100%' }} />
})
