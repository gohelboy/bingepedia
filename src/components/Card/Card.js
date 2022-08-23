import { Badge } from "@material-ui/core";
import { img_300 } from "../../config/config";
import "./Card.css";

const Card = ({ id, title, date, poster, type, vote }) => {
  return (
    <div className="card">
      <Badge
        badgeContent={Math.round(vote)}
        overlap="rectangular"
        color={vote > 6 ? "primary" : "secondary"}
      />
      <img className="poster" src={`${img_300}/${poster}`} alt={title} />
      <div className="title">{title}</div>
      <div className="info">
        <span>{type === "tv" ? "TV Series" : "Movie"}</span>
        <span className="date">{date ? date : "N/A"}</span>
      </div>
    </div>
  );
};
export default Card;
