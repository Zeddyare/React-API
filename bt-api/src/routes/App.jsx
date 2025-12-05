import { useEffect, useState } from 'react'
import '../App.css'
import ShowCard from '../ui/ShowCard.jsx'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('PostedDate')
  const [sortDir, setSortDir] = useState('asc')

  //AI help with sorting implementation
  useEffect(() => {
    const getShows = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({ sort: sortBy, dir: sortDir })
        const response = await fetch(`${apiUrl}?${params.toString()}`)
        if (!response.ok) {
          setError(`Request failed: ${response.status}`)
          setShows([])
          return
        }
        const result = await response.json()
        setShows(result)
      } catch (e) {
        setError('Network error')
        setShows([])
      } finally {
        setLoading(false)
      }
    }
    getShows()
  }, [apiUrl, sortBy, sortDir])

  //AI help with bootstrap
  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <h1 className="mb-0 me-auto">Shows</h1>
        <div className="d-flex gap-2">
          <select
            className="form-select form-select-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="PostedDate">Newest</option>
            <option value="AirDate">Air Date</option>
            <option value="ShowTitle">Title</option>
            <option value="Owner">Owner</option>
            <option value="Type">Category</option>
          </select>
          <select
            className="form-select form-select-sm"
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : shows.length === 0 ? (
        <div className="text-center py-5 text-muted">No shows found.</div>
      ) : (
        <div className="photo-grid">
          {shows.map((show) => (
            <div className="photo-grid-item" key={show.Id}>
              <ShowCard
                Id={show.Id}
                ShowTitle={show.ShowTitle}
                PhotoPath={show.PhotoPath}
                Venue={show.Venue}
                AirDate={show.AirDate}
                Type={show.Type}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
