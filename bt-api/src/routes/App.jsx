import { useEffect, useState } from 'react'
import '../App.css'
import ShowCard from '../ui/ShowCard.jsx'


function App() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [shows, setShows] = useState([])
  useEffect(() => {
  const getShows = async () => {
    try {
      console.log('Fetching from:', apiUrl)
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        console.error('Failed response:', response.status)
        return
      }
      
      const result = await response.json()
      
      setShows(result)
    } catch (e) {
      console.error('Fetch error:', e)
    }
  }
  getShows()
}, [apiUrl])
  return (
    <>
      <div className="photo-grid">
        <div>
          {shows.length > 0 && shows.map((show) => (
            <div key={show.Id}>
            <ShowCard
              Id={show.Id}
              ShowTitle={show.ShowTitle}
              PhotoPath={show.PhotoPath}
            />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
