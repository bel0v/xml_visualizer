import React from 'react'
import { Flex } from '@rebass/grid'
import styled from 'styled-components'
import { loadFile, walkXml } from 'utils'

const MenuBar = styled(Flex)`
  background: #8bc34a;
`

const drawNode = node => {
  console.log('drawing node...', node)
}

const onFileLoad = e => {
  const file = loadFile(e).then(doc => walkXml(doc, drawNode))
}

export const Menu = () => {
  return (
    <MenuBar as="header" px="1rem" py="0.5rem">
      <label>
        <input type="file" onChange={onFileLoad} />
      </label>
    </MenuBar>
  )
}
