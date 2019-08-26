import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const NodeTextarea = styled('textarea')`
  width: 100%;
  max-height: 100%;
  background: none;
  border: none;
  resize: vertical;
`

const NodeViewer = ({ node }) => {
  console.log(node)
  if (!node.element) {
    return null
  }
  return <NodeTextarea rows={20} spellcheck="false" key={node.id} defaultValue={node.element.outerHTML} />
}

export const ChosenNodeViewer = connect((state) => ({ node: state.node }))(
  NodeViewer
)
