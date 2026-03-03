import axios from "axios";
import { useState, useEffect, lazy, Suspense } from "react";
import useGenres from "../../hooks/useGenres";
import GenreChip from "../../components/GenreChip/GenreChip";
import CustomPagination from "../../components/Pagination/CustomPagination";
const Card = lazy(async () => await import("../../components/Card/Card"));

const Series = () => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPage, setNoOfPage] = useState();
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genre, setGenre] = useState([]);
  const genreforURL = useGenres(selectedGenre);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //&with_genres=${genreforURL}
  const fetchMovie = async () => {
    if (!import.meta.env.VITE_API_KEY) {
      setError("API key missing. Please configure VITE_API_KEY.");
      setMovie([]);
      setNoOfPage(0);
      return;
    }
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );
      setMovie(data.results);
      setNoOfPage(data.total_pages);
    } catch (e) {
      setError("Failed to load series. Please try again.");
      setMovie([]);
      setNoOfPage(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
    // eslint-disable-next-line
  }, [page, genreforURL]);

  return (
    <div>
      <h1 className="pageTitle">TV Series</h1>

      <GenreChip
        type="movie"
        selectedGenres={selectedGenre}
        setSelectedGenres={setSelectedGenre}
        genres={genre}
        setGenres={setGenre}
        setPage={setPage}
      />

      <div className="movie_tv_list">
        {loading && <div className="loader"></div>}
        {error && !loading && <div style={{ margin: "1rem 0", color: "#ff6b6b" }}>{error}</div>}
        {movie &&
          movie.map((m) => {
            return (
              <Suspense
                key={m.id}
                fallback={<span className="skeleton"></span>}
              >
                <Card
                  key={m.id}
                  id={m.id}
                  title={m.title || m.name}
                  poster={m.poster_path}
                  date={m.first_air_date || m.release_date}
                  type="tv"
                  vote={m.vote_average}
                />
              </Suspense>
            );
          })}
      </div>
      <CustomPagination
        setPage={setPage}
        noOfPage={noOfPage > 500 ? 500 : noOfPage}
      />
    </div>
  );
};

export default Series;
