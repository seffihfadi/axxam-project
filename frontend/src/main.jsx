import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './app/store.js' 
import PaymentIntegration from './components/reservation/PaymentIntegration.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PaymentIntegration>
        <Router>
          <App />
        </Router>
      </PaymentIntegration>
    </Provider>
  </React.StrictMode>,
)