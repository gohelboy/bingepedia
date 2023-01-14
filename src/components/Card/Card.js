import { Badge } from "@mui/material";
import { img_300, unavialable } from "../../config/config";
import "./Card.css";
import ContentDetailModal from "../ContentDetailModal/ContentDetailModal";

const Card = ({ id, title, date, poster, type, vote }) => {
  return (
    <ContentDetailModal type={type} id={id}>
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
    </ContentDetailModal>
  );
};
export default Card;
