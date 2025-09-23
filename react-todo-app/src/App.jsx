import { useState } from 'react'
import './App.css'
import TodoContent from './todo-content/TodoContent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoContent />
    </>
  )
}

export default App
