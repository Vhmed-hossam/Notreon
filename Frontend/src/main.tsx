import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'

createRoot(document.getElementById('notreon')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
