import React from 'react'
import { connect } from 'react-redux'
import { colorScale } from 'utils'

export const NodesSettings = connect((state) => ({
  graph: state.graph.model,
  isGraphBuilt: state.graph.isBuilt,
}))(({ graph, isGraphBuilt }) => {
  if (!isGraphBuilt) {
    return null
  }
  function colorByLevel() {
    const nodesLevels = graph.nodes
      .get({ fields: ['level'] })
      .map((node) => node.level)
    const existingLevels = [...new Set(nodesLevels)]
    graph.groupNodes({ groupName: (node) => `${node.level}` })
    const groups = {}
    existingLevels.forEach(
      (level) =>
        (groups[level] = { color: colorScale(level / existingLevels.length * 100) })
    )
    if (graph.network) {
      graph.network.setOptions({ ...graph.options, groups })
    }
  }
  colorByLevel()
  return <div>'settings..'</div>
})