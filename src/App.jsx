
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Authentication from './pages/auth/Authentication'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={ <Authentication/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
