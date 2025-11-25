import {useParams, Link} from 'react-router-dom'

function Comment() {
    const { showId } = useParams();
    return (
       <>
        <p><Link to={`/details/${showId}`}>←Back to Show</Link></p>
        <div>Comment Page for ID: {showId}</div>
       </>
    )
}

export default Comment;