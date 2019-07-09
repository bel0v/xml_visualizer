import React from 'react'
import { Flex } from '@rebass/grid'
import styled from 'styled-components'

const MenuBar = styled(Flex)`
  background: #8bc34a;
`

export const Menu = () => {
  return (
    <MenuBar as="header" px="1rem" py="0.5rem">
      Menu
    </MenuBar>
  )
}
