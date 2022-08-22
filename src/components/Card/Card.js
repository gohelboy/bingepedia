import { img_300 } from "../../config/config";
import "./Card.css"
const Card = ({ id, title, date, poster, type, vote }) => { 
    return <div className="card">
        <img src={`${img_300}/${poster}`} alt={title} />
        <h5 className="title">{title}</h5>
        <div className="info">
            <span>{type === "tv" ? "TV Series" : "Movie"}</span>
            <span className="date">{date}</span>
        </div>
    </div>;
}
export default Card;