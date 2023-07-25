import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeMenu from './components/HomeMenu'
import HomeBody from './components/HomeBody'
import Registration from './components/Registration';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

function App() {
  

  return (
    <>
     <Router>
      <div>
        <Header />
        <HomeMenu />
        <Routes>
          <Route path="/" element={<HomeBody />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    </>
  )
}

export default App
