
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Authentication from './pages/auth/Authentication'
import Dashboard from './pages/dashboard/Dashboard'
import NavBar from './components/nav/NavBar'

function App() {
  const [isActive, setIsActive] = useState(false); 
  const [isLoginPage, setIsLoginPage] = useState(true); 

  const handleNav = (msg) => {
    setIsLoginPage(msg);
  }

   const handleModal = (msg) => {
    setIsActive(msg);
}
  return (
    <BrowserRouter>
     {!isLoginPage && <NavBar handleModal={handleModal} /> }
      <Routes>
        <Route path="login" element={<Authentication handleNav={ handleNav } /> } />
        <Route path="dashboard" element={<Dashboard isActive={isActive} setIsActive={setIsActive} handleModal={handleModal} handleNav={ handleNav } />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
