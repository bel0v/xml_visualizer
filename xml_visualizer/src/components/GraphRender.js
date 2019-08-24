import React, { useRef, useEffect } from 'react'
import vis from 'visjs-network'

export const GraphRender = ({ graph, options, events }) => {
  console.log(graph)
  const container = useRef(null)
  useEffect(() => {
    const data = {
      nodes: graph.nodes,
      edges: graph.edges
    }
    graph.network = new vis.Network(container.current, data, options)
    Object.keys(events).forEach(event => {
      graph.network.on(event, events[event])
    })
  })
  return <div ref={container} style={{ height: '100%' }} />
}
