import {Link} from 'react-router-dom'

function ShowCard(props) {
    return (
        <div className="photo-grid-item">
            <Link to={`details/${props.Id}`}>
                <img src={props.PhotoPath} alt={props.ShowTitle} />
                <div className="label">{props.ShowTitle}</div>
            </Link>
        </div>
    )
}

export default ShowCard;