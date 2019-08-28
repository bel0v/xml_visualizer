import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'
import * as actions from 'data/actions'

const NodeCard = styled(Flex)`
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

const NodeItem = (props) => {
  const dispatch = useDispatch()
  const graph = useSelector((state) => state.graph.model)
  const selectedNode = useSelector((state) => state.node)

  const { nodeItem } = props
  if (!nodeItem) {
    return null
  }
  return (
    <NodeCard
      p='0.25rem'
      onMouseOver={() => {
        graph.network.setSelection(
          {
            edges: getCommonEdges(selectedNode, nodeItem, graph.network),
            nodes: [nodeItem.id, selectedNode.id],
          },
          { unselectAll: true, highlightEdges: false }
        )
      }}
      onMouseOut={() => {
        graph.network.selectNodes([selectedNode.id], false)
      }}
    >
      {nodeItem.nodeName}
      <div>
        <button
          onClick={() => {
            graph.network.selectNodes([nodeItem.id], true)
            dispatch(actions.selectNode(nodeItem.id))
          }}
        >
          Выбрать
        </button>
      </div>
    </NodeCard>
  )
}

export const ChosenNodeViewer = () => {
  const element = useSelector((state) => state.node.element)
  const doc = useSelector((state) => state.file.doc)
  const dispatch = useDispatch()
  const [editedValue, setEditedValue] = useState(null)
  const [syntaxError, setSyntaxError] = useState(false)
  if (!element) {
    return null
  }
  const hasTextNodes = element.children.length < element.childNodes.length
  const hasChildNodes = element.children.length > 0

  const onEdit = (e) => {
    setSyntaxError(false)
    setEditedValue(e.target.value)
  }
  const saveChanges = () => {
    let newEl = null
    try {
      const wrapper = doc.createElement('X');
      wrapper.innerHTML = editedValue
      newEl = wrapper.firstChild;
    } catch(e) {
      setSyntaxError(true)
      return
    }
    dispatch(actions.patchFile(newEl))
    setEditedValue(null)
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
      <textarea
        key={element.id}
        rows={4}
        spellCheck={false}
        defaultValue={element.outerHTML}
        style={{ width: '100%', borderColor: syntaxError && 'red' }}
        onChange={onEdit}
      ></textarea>
      {syntaxError && (
        <Box color='red' fontSize='.75rem'>
          Введён не валидный XML
        </Box>
      )}
      {editedValue && (
        <button onClick={saveChanges}>Сохранить изменения</button>
      )}
      <H4>Родитель:</H4>
      <NodeItem nodeItem={element.parentNode} />
      <H4>Связанные элементы:</H4>
      {hasTextNodes &&
        !hasChildNodes &&
        [...element.childNodes].map((textNode, i) => (
          <div key={i}>{`"${textNode.nodeValue}"`}</div>
        ))}
      {[...element.children].map((nodeItem, i) => (
        <NodeItem nodeItem={nodeItem} key={i} />
      ))}
    </Box>
  )
}
