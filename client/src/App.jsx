import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Aboutpage from './pages/Aboutpage'
import Homepage from './pages/Homepage'
import Collectionpage from './pages/Collectionpage'
import Loginpage from './pages/Loginpage'
import Signuppage from './pages/Signuppage'
import Errorpage from './pages/Errorpage'
import Footerpage from './components/Footerpage'
import Navbarpages from './components/Navbarpage'
import Layout from './components/Layout'



function App() {
  

  return (
<div>
  
  <Routes>
    <Route path="/" element={<Layout title={"Authentication App"}/>}>
    <Route path="about" element={< Aboutpage title={"About"}/>}/>
    <Route index  element={<Homepage title={"Homepage"}/>}/>
    <Route path="collection" element={<Collectionpage title={"Collection"}/>}/>
    <Route path="login" element={<Loginpage title={"Loginpage"}/>}/>
    <Route path="signup" element={<Signuppage title={"Signuppage"}/>}/>
    <Route path="cart" element={<cart/>}/>
    <Route path="*" element={<Errorpage/>}/>
    </Route>
    
  </Routes>
  
</div>
      
  )
}

export default App
