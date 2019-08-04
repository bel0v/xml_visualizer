import React, { Component } from 'react'
import { Menu } from 'components'
import Graph from 'vis-react'
import { Box } from '@rebass/grid'
import styled from 'styled-components'
import { loadFile, walkXMl } from 'utils'
import { connect } from 'react-redux'
import * as actions from 'data/actions'
import { Graph as GraphModel } from 'data/models/Graph'

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

class MainPage extends Component {
  state = {
    network: null,
    depth: 10
  }

  onFileLoad = e => {
    const { dispatch } = this.props
    dispatch(actions.loadFileStart())
    const graph = GraphModel()
    const { depth } = this.state
    loadFile(e)
      .then(doc => {
        dispatch(actions.loadFileSuccess(doc))
        dispatch(actions.buildGraphStart())
        walkXMl(doc, depth, graph.addNode)
      })
      .then(() => {
        dispatch(actions.buildGraphSuccess(graph))
      })
  }

  getNetwork = network => {
    this.setState({ network })
  }

  onDepthChange = e => {
    const depth = e.target.value
    this.setState({ depth })
    if (this.props.graph) {
      // todo: set depth in model presenter
      this.setState({
        nodes: this.graph.getNodes().filter(node => {
          return node.level <= depth
        })
      })
    }
  }

  render() {
    const { depth } = this.state
    const { graph = {} } = this.props
    const nodes = graph.getNodes()
    const edges = graph.getEdges()
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
        <label htmlFor="depth">Глубина: {depth}</label>
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

const ConnectedMainPage = connect(state => ({ graph: state.graph }))(MainPage)
export { ConnectedMainPage as MainPage }
