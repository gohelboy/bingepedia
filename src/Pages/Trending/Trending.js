import axios from "axios";
import { useEffect, useState } from "react";
//6072e56555742bd0feaf1f7249e65a87
const Trending = () => {
  const [movie, setMovie] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setMovie(data.result);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {movie && movie.map((c) => console.log(c))}
      </div>
    </div>
  );
};

export default Trending;
