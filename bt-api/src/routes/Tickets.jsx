import {useParams, Link} from 'react-router-dom'

function TicketForm() {
    const { Id } = useParams();
    return (
       <>
        <p><Link to={`/details/${Id}`}>←Back to Show</Link></p>
        <div>Buy a ticket to show {Id}</div>
       </>
    )
}

export default TicketForm;