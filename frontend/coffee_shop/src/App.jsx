import { useState } from 'react'
// import './App.css'
import './assets/css/global.css'

/* Components */
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {
  return (
    <div className="text-base sm:text-lg text-white min-h-screen">
      <Navigation></Navigation>
      <Footer></Footer>
    </div>
  )
}

export default App
