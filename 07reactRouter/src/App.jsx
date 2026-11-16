import { useState } from 'react'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Home from './components/home/home'

import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <>
     <Header/>
     <Outlet/>
     <Footer/>


    </>
  )
}

export default App
