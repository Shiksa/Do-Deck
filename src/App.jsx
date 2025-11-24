import React from 'react'
import { TodoProvider } from './contexts'
import Home from './components/Home'

const App = () => {
  return (
    <>
      <TodoProvider>
        <Home />
      </TodoProvider>
    </>
  )
}

export default App
