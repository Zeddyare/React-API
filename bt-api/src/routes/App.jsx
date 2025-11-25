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
      console.log('Response status:', response.status, response.statusText)
      console.log('Response ok:', response.ok)
      
      if (!response.ok) {
        console.error('Failed response:', response.status)
        return
      }
      
      const result = await response.json()
      console.log('Raw API result:', result)
      console.log('Result type:', typeof result)
      console.log('Is array:', Array.isArray(result))
      console.log('Result length:', result?.length)
      
      if (result && result.length > 0) {
        console.log('First item:', result[0])
        console.log('First item keys:', Object.keys(result[0]))
      }
      
      setShows(result)
    } catch (e) {
      console.error('Fetch error:', e)
    }
  }
  getShows()
}, [apiUrl])

console.log('Current shows state:', shows)
console.log('Shows length:', shows.length)

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
