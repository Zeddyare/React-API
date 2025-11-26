import {useParams, Link} from 'react-router-dom'
import {useEffect, useState} from 'react'

function Details() {
    const { Id } = useParams();

    const [show, setShow] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getShowById = async () => {
            const response = await fetch(`${apiUrl}${Id}`);
            const result = await response.json();

            if (response.ok) {
                setShow(result);
            }
        }
        getShowById();
    }, []);

    return (
        <>
        <p><Link to="/">← Back to Home</Link></p>
        <div> 
            { show && (
                <>
                    <h2>{show.ShowTitle}</h2>
                    <img src={show.PhotoPath} alt={show.ShowTitle} width="600"/>
                </>
            )}
        </div>
        <h3>Details</h3>
        <p>Nothing yet...</p>

        <p><Link to={`/tickets/${Id}`}>Purchase a Ticket</Link></p>
        </>
    )
}

export default Details;