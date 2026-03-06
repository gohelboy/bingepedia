import axios from "axios";
import { useEffect, useState, lazy, Suspense } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import AdTop728x90 from "../../components/ads/AdTop728x90";
import AdBottom468x60 from "../../components/ads/AdBottom468x60";
const Card = lazy(async () => await import("../../components/Card/Card"));

const Trending = () => {
  const [page, setPage] = useState(1);
  const [movie, setMovie] = useState([]);
  const [noOfPage, setNoOfPage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTrending = async () => {
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
        `https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`
      );
      setMovie(data.results);
      setNoOfPage(data.total_pages);
    } catch (e) {
      setError("Failed to load trending content. Please try again.");
      setMovie([]);
      setNoOfPage(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <h1 className="pageTitle">Trending</h1>
      <AdTop728x90 />
      {loading && <div className="loader"></div>}
      {error && !loading && <div style={{ margin: "1rem 0", color: "#ff6b6b" }}>{error}</div>}
      <div className="movie_tv_list">
        {movie?.map((m) => {
          return (
            <Suspense key={m.id} fallback={<span className="skeleton"></span>}>
              <Card
                key={m.id}
                id={m.id}
                title={m.title || m.name}
                poster={m.poster_path}
                date={m.first_air_date || m.release_date}
                type={m.media_type}
                vote={m.vote_average}
              />
            </Suspense>
          );
        })}
      </div>
      <AdBottom468x60 />
      <CustomPagination
        setPage={setPage}
        noOfPage={noOfPage > 1000 ? 1000 : noOfPage}
      />
    </div>
  );
};

export default Trending;
