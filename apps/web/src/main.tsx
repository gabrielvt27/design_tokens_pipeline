import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyTokenMode, tokenModes, type TokenCollection } from './tokens/tokens'

// `?color=dark&borderRadius=sharp` abre direto num cenário — útil em demo.
const parameters = new URLSearchParams(window.location.search)
for (const collection of Object.keys(tokenModes) as TokenCollection[]) {
  const mode = parameters.get(collection)
  if (mode && (tokenModes[collection] as readonly string[]).includes(mode)) {
    applyTokenMode(collection, mode as never)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
