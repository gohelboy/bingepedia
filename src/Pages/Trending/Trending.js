import axios from "axios";
import { useEffect, useState } from "react";

import Card from "../../components/Card/Card";

//6072e56555742bd0feaf1f7249e65a87
const Trending = () => {
  const [movie, setMovie] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setMovie(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {movie &&
          movie.map((c) => {
            return (
              <Card
                id={c.id}
                title={c.title || c.name}
                poster={c.poster_path}
                date={c.first_air_date || c.relese_data}
                type={c.media_type}
                vote={c.vote_average}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Trending;
