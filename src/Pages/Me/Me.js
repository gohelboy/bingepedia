import { useState, useContext } from "react";
import { Tab, Tabs } from "@material-ui/core";
import Card from "../../components/Card/Card";
import { GlobalContext } from "../../context/GlobalContextAccess";

export default function Me() {
  const [type, setType] = useState(0);

  const { watchlist } = useContext(GlobalContext);

  return (
    <div>
      <Tabs
        centered
        indicatorColor="secondary"
        textColor="secondary"
        value={type}
        onChange={(event, newValue) => {
          setType(newValue);
        }}
      >
        <Tab label="Movie" />
        <Tab label="Series" />
      </Tabs>
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
        })}
      </div>
    </div>
  );
}
