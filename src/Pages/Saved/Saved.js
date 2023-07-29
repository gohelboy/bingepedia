import { useState, Suspense, lazy } from "react";
import { Tab, Tabs } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authSlice";
import AuthForm from "../Auth/AuthForm";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Card = lazy(async () => await import("../../components/Card/Card"));

const Saved = ({ setOpenUserMenu }) => {
  const user = useSelector(selectUser);
  let { watchlist, watched } = useSelector((state) => state.saveReducer);

  const [list, setList] = useState(0);
  const [type, setType] = useState(0);

  let noOfMovieWatchlist = 0;
  let noOfMovieWatched = 0;
  let noOfSeriesWatchlist = 0;
  let noOfSeriesWatched = 0;

  function renderBadge() {
    if (list === 0 && type === 0) {
      return <p>{noOfMovieWatchlist} Movies </p>;
    } else if (list === 0 && type === 1) {
      return <p>{noOfSeriesWatchlist} Series </p>;
    } else if (list === 1 && type === 0) {
      return <p>{noOfMovieWatched} Movies </p>;
    } else if (list === 1 && type === 1) {
      return <p>{noOfSeriesWatched} Series </p>;
    }
  }

  return (
    <div>
      <button onClick={() => setOpenUserMenu('me')} className="back-btn"><ArrowBackIosNewIcon /></button>
      <Tabs
        sx={{ button: { color: "#808080" } }}
        centered
        indicatorColor="primary"
        value={list}
        onChange={(event, newValue) => {
          setList(newValue);
        }}
      >
        <Tab label="Watchlist" style={{ width: "50%" }} />
        <Tab label="Watched" style={{ width: "50%" }} />
      </Tabs>
      <Tabs
        sx={{ button: { color: "#808080" } }}
        indicatorColor="secondary"
        value={type}
        onChange={(event, newValue) => {
          setType(newValue);
        }}
      >
        <Tab icon={<MovieIcon />} />
        <Tab icon={<LiveTvIcon />} />
        <div className="contentNoBadge">
          {watchlist.forEach((data) => {
            if (data.title && type === 0) {
              noOfMovieWatchlist++;
            } else if (data.name && type === 1) {
              noOfSeriesWatchlist++;
            }
          })}

          {watched.forEach((data) => {
            if (data.title && type === 0) {
              noOfMovieWatched++;
            } else if (data.name && type === 1) {
              noOfSeriesWatched++;
            }
          })}
          {renderBadge()}
        </div>
      </Tabs>
      {list === 0 ? (
        <div className="movie_tv_list">
          {watchlist?.map((data) => {
            if (data.title && type === 0) {
              return (
                <Suspense
                  key={data.id}
                  fallback={<span className="skeleton"></span>}
                >
                  <Card
                    key={data.id}
                    id={data.id}
                    title={data.title || data.name}
                    poster={data.poster_path}
                    date={data.first_air_date || data.release_date}
                    type="movie"
                    vote={data.vote_average}
                  />
                </Suspense>
              );
            } else if (data.name && type === 1) {
              return (
                <Suspense
                  key={data.id}
                  fallback={<span className="skeleton"></span>}
                >
                  <Card
                    key={data.id}
                    id={data.id}
                    title={data.title || data.name}
                    poster={data.poster_path}
                    date={data.first_air_date || data.release_date}
                    type="tv"
                    vote={data.vote_average}
                  />
                </Suspense>
              );
            }
            return [];
          })}
        </div>
      ) : (
        <div className="movie_tv_list">
          {watched?.map((data) => {
            if (data.title && type === 0) {
              return (
                <Suspense
                  key={data.id}
                  fallback={<span className="skeleton"></span>}
                >
                  <Card
                    key={data.id}
                    id={data.id}
                    title={data.title || data.name}
                    poster={data.poster_path}
                    date={data.first_air_date || data.release_date}
                    type="movie"
                    vote={data.vote_average}
                  />
                </Suspense>
              );
            } else if (data.name && type === 1) {
              return (
                <Suspense
                  key={data.id}
                  fallback={<span className="skeleton"></span>}
                >
                  <Card
                    key={data.id}
                    id={data.id}
                    title={data.title || data.name}
                    poster={data.poster_path}
                    date={data.first_air_date || data.release_date}
                    type="tv"
                    vote={data.vote_average}
                  />
                </Suspense>
              );
            }
            return [];
          })}
        </div>
      )}
    </div>
  );
};

export default Saved;
