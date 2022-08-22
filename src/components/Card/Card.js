import { img_300 } from "../../config/config";
import "./Card.css"


const Card = ({ id, title, date, poster, type, vote }) => { 
    return (
        <div className="card">
            <img className="poster" src={`${img_300}/${poster}`} alt={title} />
            <div className="title">{title}</div>
            <div className="info">
                <span>{type === "tv" ? "TV Series" : "Movie"}</span>
                <span className="date">{date ? date : "N/A"}</span>
            </div>
        </div>
    );
}
export default Card;