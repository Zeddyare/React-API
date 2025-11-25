import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './routes/App.jsx'
import Comment from './routes/Comment.jsx'
import Details from './routes/Details.jsx'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:Id" element={<Details />} />
        <Route path="/comment/:Id" element={<Comment />} />
      </Routes>
    </Router>
  </StrictMode>,
)
