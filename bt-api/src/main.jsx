import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './routes/App.jsx'
import TicketForm from './routes/Tickets.jsx'
import Details from './routes/Details.jsx'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:Id" element={<Details />} />
        <Route path="/tickets/:Id" element={<TicketForm />} />
      </Routes>
    </Router>
  </StrictMode>,
)
