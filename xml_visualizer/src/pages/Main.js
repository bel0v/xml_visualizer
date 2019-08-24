import React, { Component, useState } from 'react'
import { Menu, GraphRender, NodesSettings } from 'components'
import { Box, Flex } from '@rebass/grid'
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
    hideEdgesOnDrag: false,
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
  width: 100%;
`
const MenuItem = styled(Box)`
  margin-bottom: 1.5rem;
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
    const { dispatch, graph } = this.props
    dispatch(actions.loadFileStart())

    const newGraph = GraphModel({depth: graph.depth})
    loadFile(e)
      .then((doc) => {
        dispatch(actions.loadFileSuccess(doc))
        dispatch(actions.buildGraphStart())
        walkXMl(doc, null, newGraph.addNode)
      })
      .then(() => {
        dispatch(actions.buildGraphSuccess(newGraph))
      })
  }

  onReset = () => {
    this.props.dispatch(actions.resetAll())
    this.fileInput.value = ''
  }

  render() {
    const { graph } = this.props
    return (
      <Flex>
        <Menu width='20rem'>
          <MenuItem>
            <input
              type='file'
              onChange={this.onFileLoad}
              ref={(node) => (this.fileInput = node)}
            />
          </MenuItem>
          <MenuItem>
            <button type='button' onClick={this.onReset}>
              Сброс
            </button>
          </MenuItem>
          <MenuItem>
            <DepthFilter graph={graph} />
          </MenuItem>
          <MenuItem>
            <NodesSettings />
          </MenuItem>
          <MenuItem>
            <button onClick={() => graph.network.storePositions()}>store positions</button>
          </MenuItem>
        </Menu>
        <GraphWrapper>
          <GraphRender graph={graph} options={options} events={events} />
        </GraphWrapper>
      </Flex>
    )
  }
}

const ConnectedMainPage = connect((state) => ({ graph: state.graph.model }))(
  MainPage
)
export { ConnectedMainPage as MainPage }
