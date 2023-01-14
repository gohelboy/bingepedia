import { useState, useContext } from "react";
import { Tab, Tabs } from "@material-ui/core";
import MovieIcon from "@mui/icons-material/Movie";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Card from "../../components/Card/Card";
import { GlobalContext } from "../../context/GlobalContextAccess";

export default function Me() {
  const [list, setList] = useState(0);
  const [type, setType] = useState(0);
  const { watchlist, watched } = useContext(GlobalContext);

  console.log("list : %d", list);
  console.log("type : %d", type);

  return (
    <div>
      <Tabs
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
        centered
        indicatorColor="secondary"
        value={type}
        onChange={(event, newValue) => {
          setType(newValue);
        }}
      >
        <Tab icon={<MovieIcon />} />
        <Tab icon={<LiveTvIcon />} />
      </Tabs>
      {list === 0 ? (
        <div className="movie_tv_list">
          {watchlist.map((data) => {
            if (data.title && type === 0) {
              return (
                <Card
                  key={data.id}
                  id={data.id}
                  title={data.title || data.name}
                  poster={data.poster_path}
                  date={data.first_air_date || data.release_date}
                  type="movie"
                  vote={data.vote_average}
                />
              );
            } else if (data.name && type === 1) {
              return (
                <Card
                  key={data.id}
                  id={data.id}
                  title={data.title || data.name}
                  poster={data.poster_path}
                  date={data.first_air_date || data.release_date}
                  type="tv"
                  vote={data.vote_average}
                />
              );
            }
            return [];
          })}
        </div>
      ) : (
        <div className="movie_tv_list">
          {watched.map((data) => {
            if (data.title && type === 0) {
              return (
                <Card
                  key={data.id}
                  id={data.id}
                  title={data.title || data.name}
                  poster={data.poster_path}
                  date={data.first_air_date || data.release_date}
                  type="movie"
                  vote={data.vote_average}
                />
              );
            } else if (data.name && type === 1) {
              return (
                <Card
                  key={data.id}
                  id={data.id}
                  title={data.title || data.name}
                  poster={data.poster_path}
                  date={data.first_air_date || data.release_date}
                  type="tv"
                  vote={data.vote_average}
                />
              );
            }
            return [];
          })}
        </div>
      )}
    </div>
  );
}
