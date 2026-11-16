import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/home/home.jsx'
import About from './components/about/about.jsx'
import Contact from './components/contactUs/contact.jsx'
import User from './components/User/user.jsx'
import Github from './components/github/github.jsx'
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children:[
//       {
//         path: '',
//         element: <Home />
//       },
//       {
//         path: 'about',
//         element: <About/>
//       },
//       {
//         path: 'contact',
//         element: <Contact/>
//       }
//     ]
//   }
// ])

// another method to create route

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App/>} >
    <Route path="" element={<Home/>}/>
    <Route path="about" element={<About/>}/>
    <Route path="contact" element={<Contact/>}/>
    <Route path="user/:userid" element={<User/>}/>
    <Route path="github" element={<Github/>}/>
  </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <RouterProvider router={router} />

  </StrictMode>,
)
