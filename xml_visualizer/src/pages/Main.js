import React from 'react'
import {
  Menu,
  GraphRender,
  NodesSettings,
  FileLoader,
  FileSaver,
  DepthFilter,
  ChosenNodeViewer,
} from 'components'
import { Box, Flex } from '@rebass/grid'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
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

export const MainPage = () => {
  const graph = useSelector((state) => state.graph.model)
  const dispatch = useDispatch()

  const onReset = () => {
    dispatch(actions.resetAll())
  }

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
          <button type='button' onClick={onReset}>
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
        <GraphRender options={options} />
      </GraphWrapper>
    </Flex>
  )
}
