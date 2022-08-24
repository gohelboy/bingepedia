import axios from "axios";
import { useState, useEffect } from "react";

import CustomPagination from "../../components/Pagination/CustomPagination";
import Card from "../../components/Card/Card";
import GenreChip from "../../components/GenreChip/GenreChip";

const Movie = () => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPage, setNoOfPage] = useState();
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genre, setGenre] = useState([]);

  //&with_genres=${genreforURL}
  const fetchMovie = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    setMovie(data.results);
    setNoOfPage(data.total_pages);
  };

  useEffect(() => {
    fetchMovie();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Movie</span>

      <GenreChip
        type="movie"
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genre={genre}
        setGenre={setGenre}
        setPage={setPage}
      />

      <div className="trending">
        {movie &&
          movie.map((m) => {
            return (
              <Card
                key={m.id}
                id={m.id}
                title={m.title || m.name}
                poster={m.poster_path}
                date={m.first_air_date || m.relese_data}
                type={m.media_type}
                vote={m.vote_average}
              />
            );
          })}
      </div>
      {noOfPage > 1 && (
        <CustomPagination setPage={setPage} NoOfPage={noOfPage} />
      )}
    </div>
  );
};

export default Movie;
