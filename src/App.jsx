import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Dashboard Test</h1>
        <p>GitHub Pages React 테스트입니다.</p>
      </div>
    </>
  )
}

export default App
