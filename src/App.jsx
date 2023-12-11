
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Authentication from './pages/auth/Authentication'
import Projects from './pages/projects/Projects'
import NavBar from './components/nav/NavBar'
import ProjectDetails from './pages/project-details/ProjectDetails';
import UserDetails from './pages/user-details/UserDetails';
import EmailMsg from './pages/emailMsg/EmailMsg';
import Registration from './components/registration/Registration';

function App() {
  const [isActive, setIsActive] = useState(false); 
  const [isLoginPage, setIsLoginPage] = useState(false); 

  const handleNav = (bool) => {
      setIsLoginPage(bool); 
  }

   const handleModal = (msg) => {
    setIsActive(msg);
}

  return (
    <BrowserRouter>
      {!isLoginPage && <NavBar handleModal={handleModal}/> }
      <Routes>
        <Route path="login" element={<Authentication handleNav={ handleNav } /> } />
        <Route path="register/:urlToken" element={<Registration handleNav={ handleNav } /> } />
        <Route path="signup" element={<Authentication handleNav={ handleNav } /> } />
        <Route path="projects" element={<Projects isActive={isActive} setIsActive={setIsActive} handleModal={handleModal} handleNav={ handleNav } />} />
        <Route path="/projects/:projectId" element={<ProjectDetails/>} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="email-info" element={<EmailMsg/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
