import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function addValue() {
    if(count === 20){
      setCount(20)
    }else{
       setCount(count+1);
    }

    
  }

  function removeValue() {
    if(count === 0){
      setCount(0)
    }else{
       setCount(count-1);
    }
   
  }

  return (
    <>
      <h1>Simple Counter</h1>
      <h2>Counter value : {count}</h2>
      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={removeValue}>Remove value</button>
    </>
  )
}

export default App
