import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Singup from './pages/Singup'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [isAuthanticate, setisAuthanticate] = useState(false)

  const PrivaateRoute = ({element}) => {
      
    return isAuthanticate ? element : <Navigate to="/login" />
  }

  return (
      <div className="App">
      
         <Routes>
         <Route path="/" element={<Navigate to="/login" />}/>
         <Route path="/home" element={<PrivaateRoute element={<Home/>}/>}/>
         <Route path="/singup" element={<Singup/>}/>
         <Route path="/login" element={<Login/>}/>

         </Routes>

      </div>
  )
}

export default App
