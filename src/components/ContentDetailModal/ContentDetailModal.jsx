import React, { useState, useEffect } from "react";
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
import { LoadingButton } from "@mui/lab";
import { YouTube, LibraryAddCheck } from "@mui/icons-material";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";

import "./ContentDetailModal.css";
import Carousel from "../Carousel/Carousel";
import AdsterraSlot from "../ads/AdsterraSlot";
import {
  img_300,
  img_500,
  unavialable,
  unavialableL,
} from "../../config/config";
import { selectUser } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom/dist";
import { getSuperEmbedUrl } from "../../helper/superEmbedUrl";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const watchlistLoading = useSelector(selectWatchlistLoading);
  const watchedLoading = useSelector(selectWatchedLoading);
  const { watchlist, watched } = useSelector((state) => state.saveReducer);
  const [modelOpen, setModelOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const handleOpen = () => setModelOpen(true);
  const handleClose = () => setModelOpen(false);

  const fetchdata = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`,
    );
    setContent(data);
  };

  const fetchvideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`,
    );

    setVideo(
      data.results[0]?.key || data.results[1]?.key || data.results[2]?.key,
    );
  };

  const alreadyWatchlisted = watchlist.find((o) => o.id === id);
  const watchlistDisabled = !!alreadyWatchlisted;

  const alreadyWatched = watched.find((o) => o.id === id);
  const watchedDisabled = !!alreadyWatched;

  const AddorRemoveWatchlist = async (contentItem) => {
    if (!watchlistDisabled) {
      dispatch(AsyncAddToWatchlist(contentItem));
    } else {
      dispatch(AsyncRemoveFromWatchlist(contentItem));
    }
  };

  const AddorRemoveWatched = async (contentItem) => {
    if (!watchedDisabled) {
      dispatch(AsyncAddToWatched(contentItem));
    } else {
      dispatch(AsyncRemoveFromWatched(contentItem));
    }
  };

  useEffect(() => {
    fetchdata();
    fetchvideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const superEmbedUrl = getSuperEmbedUrl({
    type,
    tmdbId: id,
    season: type === "tv" ? selectedSeason : undefined,
    episode: type === "tv" ? selectedEpisode : undefined,
  });

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
                <img
                  className="portrait"
                  src={
                    content.poster_path
                      ? `${img_300}${content.poster_path}`
                      : unavialable
                  }
                  alt={content.name || content.title}
                />
                <img
                  className="landscape"
                  src={
                    content.poster_path
                      ? `${img_500}${content.backdrop_path}`
                      : unavialableL
                  }
                  alt={content.name || content.title}
                />
              </div>
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
                <div className="model-buttons">
                  <Button
                    className="btn red"
                    variant="contained"
                    color="error"
                    startIcon={<YouTube />}
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch Trailer
                  </Button>
                  <LoadingButton
                    loading={watchlistLoading}
                    className="btn green"
                    variant="contained"
                    color="success"
                    startIcon={<PlaylistAdd />}
                    onClick={() => {
                      !user ? navigate("/me") : AddorRemoveWatchlist(content);
                    }}
                  >
                    {watchlistDisabled
                      ? "Remove from watchlist"
                      : "Add to watchlist"}
                  </LoadingButton>
                  <LoadingButton
                    loading={watchedLoading}
                    className="btn blue"
                    variant="contained"
                    color="primary"
                    startIcon={<LibraryAddCheck />}
                    onClick={() => AddorRemoveWatched(content)}
                  >
                    {watchedDisabled ? "Remove from watched" : "Watched"}
                  </LoadingButton>
                </div>
                {import.meta.env.VITE_ENABLE_SUPEREMBED === "true" && (
                  <div className="superembed-section">
                    {type === "tv" && (
                      <div className="superembed-controls">
                        <label>
                          Season:
                          <select
                            value={selectedSeason}
                            onChange={(e) =>
                              setSelectedSeason(Number(e.target.value) || 1)
                            }
                          >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                              (s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                        <label>
                          Episode:
                          <select
                            value={selectedEpisode}
                            onChange={(e) =>
                              setSelectedEpisode(Number(e.target.value) || 1)
                            }
                          >
                            {Array.from({ length: 20 }, (_, i) => i + 1).map(
                              (ep) => (
                                <option key={ep} value={ep}>
                                  {ep}
                                </option>
                              ),
                            )}
                          </select>
                        </label>
                      </div>
                    )}
                    <Button
                      className="btn superembed-btn"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (!superEmbedUrl) return;
                        if (
                          typeof window !== "undefined" &&
                          window.location.hostname === "localhost"
                        ) {
                          setShowPlayer(true);
                        } else {
                          window.open(superEmbedUrl, "_blank", "noopener,noreferrer");
                        }
                      }}
                      disabled={!superEmbedUrl}
                    >
                      {type === "tv"
                        ? "Play episode (SuperEmbed)"
                        : "Play (SuperEmbed)"}
                    </Button>
                    {showPlayer && superEmbedUrl && (
                      <div className="superembed-player">
                        <div className="superembed-aspect">
                          <iframe
                            src={superEmbedUrl}
                            title="SuperEmbed Player"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            // sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                          />
                        </div>
                        <p className="superembed-disclaimer">
                          Streams provided by external service (SuperEmbed).
                          Bingepedia does not host or control the content.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <Carousel type={type} id={id} />
                <AdsterraSlot />
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ContentDetailModal;
