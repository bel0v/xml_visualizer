import React from 'react'
import { Box } from '@rebass/grid'
import styled from 'styled-components'

const MenuBar = styled(Box)`
  background: #ffc10730;
`

export const Menu = ({children, ...props}) => {
  return (
    <MenuBar as="menu" p="1rem" m='0' {...props}>
      {children}
    </MenuBar>
  )
}
