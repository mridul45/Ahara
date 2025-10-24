import { createRoot } from 'react-dom/client'
import '@app/styles/global.css'
import App from '@app/App.jsx'
import AppProviders from '@app/providers/AppProviders.jsx'

createRoot(document.getElementById('root')).render(
  <AppProviders>
    <App />
  </AppProviders>,
)
