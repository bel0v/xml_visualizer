import React, { useState } from 'react'

export const DepthFilter = ({ graph }) => {
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
