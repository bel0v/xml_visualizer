import React, { Component } from 'react'
import { Menu } from 'components'
import Graph from 'vis-react'
import { Box } from '@rebass/grid'
import styled from 'styled-components'
import { loadFile, walkXMl } from 'utils'

const StoredGraph = () => {
  let nodes = []
  let edges = []
  function addNode(node) {
    const parentEdge = node.parentNode ? [{ from: node.parentNode.id, to: node.id }] : []
    nodes = [...nodes, { id: node.id, label: node.nodeName, level: node.level }]
    edges = [...edges, ...parentEdge]
  }
  return {
    addNode,
    getNodes: () => nodes,
    getEdges: () => edges
  }
}

var options = {
  edges: {
    color: '#000000'
  }
  // layout: {
  //   hierarchical: true
  // }
}

var events = {
  select: function(event) {
    var { nodes, edges } = event
    console.log({ nodes, edges })
  }
}

const GraphWrapper = styled(Box)`
  height: 100vh;
`

export class MainPage extends Component {
  graph = StoredGraph()
  state = {
    network: null,
    nodes: [],
    edges: [],
    depth: 10
  }

  onFileLoad = e => {
    const { depth } = this.state
    const file = loadFile(e)
      .then(doc => walkXMl(doc, depth, this.graph.addNode))
      .then(() =>
        this.setState({
          nodes: this.graph.getNodes(),
          edges: this.graph.getEdges()
        })
      )
  }

  getNetwork = network => {
    this.setState({ network })
  }

  onDepthChange = e => {
    const depth = e.target.value
    this.setState({ depth })
    this.setState({
      nodes: this.graph.getNodes().filter(node => {
        return node.level <= depth
      })
    })
  }

  render() {
    const { nodes, edges, depth } = this.state
    return (
      <>
        {/* <Menu /> */}
        <input type="file" onChange={this.onFileLoad} />
        <input
          type="range"
          id="start"
          name="depth"
          min="1"
          max="10"
          value={depth}
          onChange={this.onDepthChange}
        />
        <label for="depth">Глубина: {depth}</label>
        <GraphWrapper>
          <Graph
            graph={{ nodes, edges }}
            options={options}
            events={events}
            getNetwork={this.getNetwork}
            vis={vis => (this.vis = vis)}
          />
        </GraphWrapper>
      </>
    )
  }
}
