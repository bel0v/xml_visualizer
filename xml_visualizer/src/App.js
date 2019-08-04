import React from 'react'
import { MainPage } from 'pages'
import { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'
import { configureStore } from 'data/store'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`

function App() {
  return (
    <Provider store={configureStore()}>
      <GlobalStyle />
      <MainPage />
    </Provider>
  )
}

export default App
