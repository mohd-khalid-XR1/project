import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Welcome from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Welcome/>
  </StrictMode>,
)
