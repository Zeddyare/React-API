import {useParams, Link} from 'react-router-dom'
import {useEffect, useState} from 'react'

function Details() {
    const { Id } = useParams();

    const [show, setShow] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getShowById = async () => {
            try {
                const response = await fetch(`${apiUrl}${Id}`);
                const result = await response.json();

                if (response.ok) {
                    setShow(result);
                }
            } catch (error) {
                console.error('Failed to fetch show:', error);
            }
        }
        getShowById();
    }, [apiUrl, Id]);

    const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
        month: 'short',   // "Dec"
        day: 'numeric',   // "4"
        hour: '2-digit',  // "07"
        minute: '2-digit' // "30"
    });
};
    //AI help with bootstrap
    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-12">
                    <Link to="/" className="btn btn-outline-secondary btn-sm">
                        ← Back to Home
                    </Link>
                </div>
            </div>

            {show ? (
                <div className="container" style={{marginLeft: '10vw'}}>
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="mb-4">{show.ShowTitle}</h1>
                        <img 
                            src={show.PhotoPath} 
                            alt={show.ShowTitle} 
                            className="img-fluid rounded shadow-sm mb-4"
                        />
                        
                        <div className="card mb-4">
                            <div className="card-header">
                                <h3 className="card-title mb-0">Details</h3>
                            </div>
                            <div className="card-body">
                                <p className="lead">Come see "{show.ShowTitle}" live!</p>
                                <p><strong>Venue:</strong> {show.Venue}</p>
                                <p><strong>Date & Time:</strong> {formatDate(show.AirDate)}</p>
                                <p><strong>Presented by:</strong> {show.Owner}</p>
                                <span className="badge bg-secondary">{show.Type}</span>
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <Link to={`/tickets/${Id}`} className="btn btn-primary btn-lg">
                                Purchase a Ticket
                            </Link>
                        </div>
                    </div>
                </div>
                </div>
            ) : (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading show details...</p>
                </div>
            )}
        </div>
    )
}

export default Details;