import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './routes/App.jsx'
import Details from './routes/Details.jsx'
import TicketForm from './routes/Tickets.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="app-shell">
      <div className="app-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/details/:Id" element={<Details />} />
            <Route path="/tickets/:Id" element={<TicketForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </StrictMode>
)
