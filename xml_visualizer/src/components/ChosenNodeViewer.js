import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Box } from '@rebass/grid'

const Child = styled(Box)`
  border: 1px solid;
  margin-bottom: 0.25rem;
  &:hover {
    outline: 1px solid;
  }
`

const H4 = styled('h4')`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`
const getCommonEdges = (node1, node2, network) => {
  const edges1 = network.getConnectedEdges(node1.id)
  const edges2 = network.getConnectedEdges(node2.id)
  return edges1.filter((value) => edges2.includes(value))
}

const NodeViewer = ({ node, graph }) => {
  const { element } = node
  if (!element) {
    return null
  }

  const renderChild = (childNode, i) => {
    return (
      <Child
        key={i}
        p='0.25rem'
        onMouseOver={() => {
          graph.network.setSelection(
            {
              edges: getCommonEdges(node, childNode, graph.network),
              nodes: [childNode.id, node.id],
            },
            { unselectAll: true, highlightEdges: false }
          )
        }}
        onMouseOut={() => {
          graph.network.selectNodes([node.id], false)
        }}
      >
        {childNode.nodeName}
      </Child>
    )
  }
  return (
    <Box>
      <H4>Элемент:</H4>
      <Box>
        <b>Имя:</b> {`<${element.nodeName}>`}
      </Box>
      <Box>
        <b>ID:</b> {element.id}
      </Box>
      <Box>
        <b>Глубина:</b> {element.level}
      </Box>
      <H4>Связанные элементы:</H4>
      {element.children.length === 0 &&
        element.childNodes.length !== 0 &&
        `"${element.childNodes[0].nodeValue}"`}
      {[...element.children].map(renderChild)}
    </Box>
  )
}

export const ChosenNodeViewer = connect((state) => ({
  node: state.node,
  graph: state.graph.model,
}))(NodeViewer)
