import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./ContentDetailModal";
import { img_300, img_500, unavialable } from "../../config/config";
import { YouTube } from "@mui/icons-material";
import "./ContentDetailModal.css";
import Carousel from "../Carousel/Carousel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  bgcolor: "#090F2C",
  borderRadius: "14px",
  boxShadow: 24,
  p: 2,
};

const ContentDetailModal = ({ children, type, id }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchdata = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchvideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0].key);
  };

  useEffect(() => {
    fetchdata();
    fetchvideo();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="card" onClick={handleOpen}>
        {children}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="ContentDetailModel">
            {content && (
              <div className="content_poster">
                <img
                  className="portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavialable
                  }
                  alt={content.name || content.title}
                />
                <img
                  className="landscape"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavialable
                  }
                  alt={content.name || content.title}
                />
              </div>
            )}
            {content && (
              <div className="about-movie">
                <span className="content_title">
                  {content.name || content.title}(
                  {(
                    content.first_air_date ||
                    content.release_date ||
                    "-----"
                  ).substring(0, 4)}
                  )
                </span>
                {content.tagline && (
                  <i className="content_tagline">{content.tagline}</i>
                )}
                <span className="content_discription">{content.overview}</span>
                <Carousel type={type} id={id} />
                <Button
                  className="trailer-btn"
                  variant="contained"
                  color="secondary"
                  startIcon={<YouTube />}
                  href={`https://www.youtube.com/watch?v=${video}`}
                >
                  Watch Trailer
                </Button>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ContentDetailModal;
