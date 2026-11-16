import { useState } from 'react'

import './App.css'
import Login from './Components/login'
import Profile from './Components/profile'
import UserContextProvider from './Context/UserContextProvider'

function App() {
 

  return (
    <UserContextProvider>
     <Login/>
     <Profile/>
    </UserContextProvider>
  )
}

export default App
