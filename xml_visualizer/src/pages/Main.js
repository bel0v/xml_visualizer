import React, { Component, useState } from 'react'
import { Menu, GraphRender, NodesSettings } from 'components'
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
  edges: {
    smooth: {
      type: 'continuous',
    },
    arrows: 'to',
  },
  interaction: {
    hideEdgesOnDrag: true,
  },
}

const events = {
  startStabilizing: function() {
    console.log('started')
  },
  stabilizationProgress: function(params) {
    // only in hidden render
    console.log('progress:', params)
  },
  stabilizationIterationsDone: function() {
    // only in hidden render
    console.log('finished stabilization interations')
  },
  stabilized: function() {
    console.log('stabilized')
  },
}

const GraphWrapper = styled(Box)`
  height: 100vh;
`

const DepthFilter = ({ graph }) => {
  const [currentDepth, setDepth] = useState(graph.depth)
  const onDepthChange = (e) => {
    const depth = e.target.value
    graph.depth = depth
    setDepth(depth)
  }
  return (
    <>
      <input
        type='range'
        id='start'
        name='depth'
        min='1'
        step='1'
        max='20'
        value={currentDepth}
        onChange={onDepthChange}
      />
      <label htmlFor='depth'>Глубина: {currentDepth}</label>
    </>
  )
}

class MainPage extends Component {
  onFileLoad = (e) => {
    const { dispatch } = this.props
    dispatch(actions.loadFileStart())
    const graph = GraphModel()
    const { depth } = graph
    loadFile(e)
      .then((doc) => {
        dispatch(actions.loadFileSuccess(doc))
        dispatch(actions.buildGraphStart())
        walkXMl(doc, depth, graph.addNode)
      })
      .then(() => {
        dispatch(actions.buildGraphSuccess(graph))
      })
  }

  onReset = () => {
    this.props.dispatch(actions.resetAll())
    this.fileInput.value = ''
  }

  render() {
    const { graph } = this.props
    return (
      <>
        {/* <Menu /> */}
        <input
          type='file'
          onChange={this.onFileLoad}
          ref={(node) => (this.fileInput = node)}
        />
        <button type='button' onClick={this.onReset}>
          Сброс
        </button>
        <DepthFilter graph={graph} />
        <NodesSettings />
        <GraphWrapper>
          <GraphRender graph={graph} options={options} events={events} />
        </GraphWrapper>
      </>
    )
  }
}

const ConnectedMainPage = connect((state) => ({ graph: state.graph.model }))(
  MainPage
)
export { ConnectedMainPage as MainPage }
