import { Badge } from "@mui/material";
import { img_300, unavialable } from "../../config/config";
import "./Card.css";
import { useSearchParams } from "react-router-dom";

const Card = ({ id, title, date, poster, type, vote }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    const next = new URLSearchParams(searchParams);
    next.set("detail", String(id));
    next.set("type", type);
    setSearchParams(next);
  };

  return (
    <div className="card" onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handleClick()}>
      <Badge
        badgeContent={Math.round(vote)}
        overlap="rectangular"
        color={vote > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        loading="lazy"
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
