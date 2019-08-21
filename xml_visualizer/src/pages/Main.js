import React, { Component } from 'react'
import { Menu, GraphRender } from 'components'
import vis from 'visjs-network'
import { Box } from '@rebass/grid'
import styled from 'styled-components'
import { loadFile, walkXMl } from 'utils'
import { connect } from 'react-redux'
import * as actions from 'data/actions'
import { Graph as GraphModel } from 'data/models/Graph'

const options = {
   physics: {
     stabilization: { enabled: false },
   },
  //  layout: {
  //    hierarchical: {
  //      enabled: true,
  //      levelSeparation: 300,
  //    }
  //  }
}

const events = {
  startStabilizing: function() {
    console.log('started')
  },
  stabilizationProgress: function(params) { // only in hidden render
    console.log('progress:', params)
  },
  stabilizationIterationsDone: function() { // only in hidden render
    console.log('finished stabilization interations')
  },
  stabilized: function() {
    console.log('stabilized')
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

  onReset = () => {
    this.props.dispatch(actions.resetAll())
    this.fileInput.value = ''
  }

  render() {
    const { depth } = this.state
    const { graph } = this.props
    return (
      <>
        {/* <Menu /> */}
        <input type="file" onChange={this.onFileLoad} ref={node => (this.fileInput = node)} />
        <button type="button" onClick={this.onReset}>
          Сброс
        </button>
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
          <GraphRender graph={graph} options={options} events={events} />
        </GraphWrapper>
      </>
    )
  }
}

const ConnectedMainPage = connect(state => ({ graph: state.graph }))(MainPage)
export { ConnectedMainPage as MainPage }
