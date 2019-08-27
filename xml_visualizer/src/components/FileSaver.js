import React from 'react'
import { useSelector } from 'react-redux'
import { saveFile, isEmpty } from 'utils'

export const FileSaver = () => {
  const file = useSelector(state =>  state.file)
  if (isEmpty(file)) {
    return null
  }
  return <button onClick={() => {saveFile(file)}}>Сохранить файл</button>
}