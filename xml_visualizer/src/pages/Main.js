import React, { Component } from 'react'
import {
  Menu,
  GraphRender,
  NodesSettings,
  FileLoader,
  FileSaver,
  DepthFilter,
  ChosenNodeViewer
} from 'components'
import { Box, Flex } from '@rebass/grid'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from 'data/actions'

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

const GraphWrapper = styled(Box)`
  height: 100vh;
  width: 100%;
`
const MenuItem = styled(Box)`
  margin-bottom: 1rem;
`

class MainPage extends Component {
  onReset = () => {
    this.props.dispatch(actions.resetAll())
  }

  render() {
    const { graph, file } = this.props
    console.log(file)
    return (
      <Flex>
        <Menu width='20rem'>
          <MenuItem>
            <FileLoader />
          </MenuItem>
          <MenuItem>
            <FileSaver />
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
            <button onClick={() => graph.network.storePositions()}>
              store positions
            </button>
          </MenuItem>
          <hr />
          <ChosenNodeViewer />
        </Menu>
        <GraphWrapper>
          <GraphRender graph={graph} options={options} />
        </GraphWrapper>
      </Flex>
    )
  }
}

const ConnectedMainPage = connect((state) => ({ graph: state.graph.model }))(
  MainPage
)
export { ConnectedMainPage as MainPage }
