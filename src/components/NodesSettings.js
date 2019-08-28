import React from 'react'
import { useSelector } from 'react-redux'
import { colorScale } from 'utils'

export const NodesSettings = () => {
  const graph = useSelector(state =>  state.graph.model)
  const isGraphBuilt = useSelector(state =>  state.graph.isBuilt)
  if (!isGraphBuilt) {
    return null
  }
  function colorBy(nodeAttribute) {
    const attributes = graph.nodes
      .get({ fields: [nodeAttribute] })
      .map((node) => node[nodeAttribute])
    const existingAttributes = [...new Set(attributes)]
    graph.groupNodes({ groupName: (node) => `${node[nodeAttribute]}` })
    const groups = {}
    existingAttributes.forEach(
      (attr) =>
        (groups[attr] = {
          color: colorScale(
            ((existingAttributes.indexOf(attr) + 1) /
              existingAttributes.length) *
              100
          ),
        })
    )
    if (graph.network) {
      graph.network.setOptions({ ...graph.options, groups })
    }
  }
  function onSelect(e) {
    const { value } = e.target
    colorBy(value)
  }
  return (
    <div>
      <select onChange={onSelect} defaultValue=''>
        <option value='' disabled hidden>
          Окрасить граф
        </option>
        <option value='level'>Окраска по глубине</option>
        <option value='label'>Окраска по типу узла</option>
      </select>
    </div>
  )
}
