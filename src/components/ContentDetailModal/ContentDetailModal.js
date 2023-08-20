import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  AsyncAddToWatchlist,
  AsyncRemoveFromWatchlist,
  AsyncAddToWatched,
  AsyncRemoveFromWatched,
  selectWatchedLoading,
  selectWatchlistLoading,
} from "../../redux/features/saveSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { LoadingButton } from '@mui/lab';
import { YouTube, LibraryAddCheck } from "@mui/icons-material";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";

import "./ContentDetailModal.css";
import Carousel from "../Carousel/Carousel";
import {
  img_300,
  img_500,
  unavialable,
  unavialableL,
} from "../../config/config";
import { selectUser } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom/dist";

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
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const watchlistLoading = useSelector(selectWatchlistLoading)
  const watchedLoading = useSelector(selectWatchedLoading)
  const { watchlist, watched } = useSelector((state) => state.saveReducer);
  const [modelOpen, setModelOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const handleOpen = () => setModelOpen(true);
  const handleClose = () => setModelOpen(false);

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

    setVideo(
      data.results[0]?.key || data.results[1]?.key || data.results[2]?.key
    );
  };

  let alreadyWatchlisted = watchlist.find((o) => o.id === id);
  const watchlistDisabled = alreadyWatchlisted ? true : false;

  let alreadyWatched = watched.find((o) => o.id === id);
  const watchedDisabled = alreadyWatched ? true : false;

  async function AddorRemoveWatchlist(content) {
    if (!watchlistDisabled) {
      dispatch(AsyncAddToWatchlist(content));
    } else {
      dispatch(AsyncRemoveFromWatchlist(content))
    }
  }

  async function AddorRemoveWatched(content) {
    if (!watchedDisabled) {
      dispatch(AsyncAddToWatched(content));
    } else {
      dispatch(AsyncRemoveFromWatched(content));
    }
  }


  // useEffect(() => { !isLoading && setOpen(true) }, [status, isLoading, message]);

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

      <Modal open={modelOpen} onClose={handleClose}>
        <Box sx={style}>
          {content && (
            <div className="ContentDetailModel">
              <div className="content_poster">
                <img className="portrait" src={content.poster_path ? `${img_300}${content.poster_path}` : unavialable} alt={content.name || content.title} />
                <img className="landscape" src={content.poster_path ? `${img_500}${content.backdrop_path}` : unavialableL} alt={content.name || content.title} />
              </div>
              <div className="about-movie">
                <span className="content_title"> {content.name || content.title}( {(content.first_air_date || content.release_date || "-----").substring(0, 4)} ) </span>
                {content.tagline && (<i className="content_tagline">{content.tagline}</i>)}
                <span className="content_discription">{content.overview}</span>
                <div className="model-buttons">
                  <Button
                    className="btn red" variant="contained" color="error" startIcon={<YouTube />} target="_blank" href={`https://www.youtube.com/watch?v=${video}`}>
                    Watch Trailer
                  </Button>
                  <LoadingButton loading={watchlistLoading} className="btn green" variant="contained" color="success" startIcon={<PlaylistAdd />} onClick={() => {
                    !user ? navigate('/me') : AddorRemoveWatchlist(content)
                  }} >
                    {watchlistDisabled ? "Remove from watchlist" : "Add to watchlist"}
                  </LoadingButton>
                  <LoadingButton loading={watchedLoading} className="btn blue" variant="contained" color="primary" startIcon={<LibraryAddCheck />} onClick={() => AddorRemoveWatched(content)} >
                    {watchedDisabled ? "Remove from watched" : "Watched"}
                  </LoadingButton>
                </div>
                <Carousel type={type} id={id} />
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ContentDetailModal;
