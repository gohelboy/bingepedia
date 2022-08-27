import { Badge } from "@material-ui/core";
import { img_300, unavialable } from "../../config/config";
import "./Card.css";

const Card = ({ id, title, date, poster, type, vote }) => {
  console.log(type);
  return (
    <div className="card">
      <Badge
        badgeContent={Math.round(vote)}
        overlap="rectangular"
        color={vote > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavialable}
        alt={title}
      />
      <b className="title">{title}</b>
      <div className="info">
        <span>{type === "tv" ? "TV Series" : "Movie"}</span>
        <span>{date ? date.split("-")[0] : "N/A"}</span>
      </div>
    </div>
  );
};
export default Card;
