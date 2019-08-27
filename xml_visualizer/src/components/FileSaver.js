import React from 'react'
import { connect } from 'react-redux'
import { saveFile, isEmpty } from 'utils'

export const FileSaver = connect(state => ({file: state.file}))(({ file }) => {
  if (isEmpty(file)) {
    return null
  }
  return <button onClick={() => {saveFile(file)}}>Сохранить файл</button>
})
