
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Authentication from './pages/auth/Authentication'
import Dashboard from './pages/dashboard/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={ <Authentication/> } />
        <Route path="dashboard" element={ <Dashboard/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
