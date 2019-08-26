import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'
import * as actions from 'data/actions'

const Child = styled(Flex)`
  align-items: center;
  justify-content: space-between;
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

const NodeViewer = ({ node, graph, dispatch }) => {
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
        <div>
          <button
            onClick={() => {
              graph.network.selectNodes([childNode.id], true)
              dispatch(actions.selectNode(childNode.id))
            }}
          >
            Выбрать
          </button>
        </div>
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
      <H4>Outer HTML:</H4>
      <textarea key={element.id} rows={4} defaultValue={element.outerHTML} style={{width: '100%'}}></textarea>
      <H4>Родитель:</H4>
      {renderChild(element.parentNode)}
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
