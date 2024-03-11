

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Donate from './pages/donate/Donate'

function App() {
  return (
    <>
      <BrowserRouter>
    <div className="app">
      <div className="left">
        <Navbar />
      </div>
      <div className="right">
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/donate" element={<Donate/>}/>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
