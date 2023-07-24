import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeMenu from './components/HomeMenu'
import HomeBody from './components/HomeBody'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
      <Header />
      <HomeMenu />
      <HomeBody />
      <Footer />
     
      </div>
    </>
  )
}

export default App
