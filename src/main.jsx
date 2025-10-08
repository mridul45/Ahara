import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/Ahara/">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
