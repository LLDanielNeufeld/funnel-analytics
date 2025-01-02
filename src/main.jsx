import React from 'react'
import ReactDOM from 'react-dom/client'
import FunnelAnalysis from './FunnelAnalysis'

console.log("main.jsx is running!")  // Füge dies hinzu
console.log("root element:", document.getElementById('root')) // Und dies

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FunnelAnalysis/>
  </React.StrictMode>,
)