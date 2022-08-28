import axios from "axios";
import { useState, useEffect } from "react";
import useGenres from "../../hooks/useGenres";
import GenreChip from "../../components/GenreChip/GenreChip";
import Card from "../../components/Card/Card";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Series = () => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPage, setNoOfPage] = useState();
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genre, setGenre] = useState([]);
  const genreforURL = useGenres(selectedGenre);

  //&with_genres=${genreforURL}
  const fetchMovie = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setMovie(data.results);
    setNoOfPage(data.total_pages);
  };

  useEffect(() => {
    fetchMovie();
    // eslint-disable-next-line
  }, [page, genreforURL]);

  return (
    <div>
      <h1 className="pageTitle">Movies</h1>

      <GenreChip
        type="movie"
        selectedGenres={selectedGenre}
        setSelectedGenres={setSelectedGenre}
        genres={genre}
        setGenres={setGenre}
        setPage={setPage}
      />

      <div className="movie_tv_list">
        {movie &&
          movie.map((m) => {
            return (
              <Card
                key={m.id}
                id={m.id}
                title={m.title || m.name}
                poster={m.poster_path}
                date={m.first_air_date || m.release_date}
                type="tv"
                vote={m.vote_average}
              />
            );
          })}
      </div>
      <CustomPagination
        setPage={setPage}
        NoOfPage={noOfPage > 500 ? 500 : noOfPage}
      />
    </div>
  );
};

export default Series;
