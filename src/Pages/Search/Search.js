import { Tab, Tabs } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
const Card = lazy(async () => await import("../../components/Card/Card"));

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [noOfPage, setNoOfPage] = useState();
  const [movie, setMovie] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setMovie(data.results);
    setNoOfPage(data.total_pages);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const searchTimeout = setTimeout(() => { fetchSearch(); }, 500);
    return () => clearTimeout(searchTimeout)
    // eslint-disable-next-line
  }, [page, type, searchText]);

  return (
    <div>
      <div
        style={{ width: "100%", display: "flex", margin: "14px 0", }} >
        <input
          type={"text"}
          name={"search"}
          placeholder={"Search Movie, Seriese, TV..."}
          autoComplete="off"
          style={{
            flex: 1,
            outline: "none",
            border: "#2C394B 2px solid",
            borderRadius: "5px",
            backgroundColor: "#2C394B",
            marginRight: "14px",
            padding: "14px",
            fontWeight: "700",
            boxShadow:
              "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
            color: "#E7F6F2",
            letterSpacing: "0.5px",
            position: "sticky",
            zIndex: 5,
          }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="contained" style={{ backgroundColor: "#2C394B" }} onClick={fetchSearch} >
          <SearchRounded />
        </Button>
      </div>
      <Tabs
        value={type}
        indicatorColor="secondary"
        centered
        sx={{ button: { color: "#808080" } }}
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ margin: "8px 0px" }}
      >
        <Tab label={"Movies"} style={{ width: "50%" }} />
        <Tab label={"TV Series"} style={{ width: "50%" }} />
      </Tabs>

      <div className="movie_tv_list">
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
                  type={type ? "tv" : "movie"}
                  vote={m.vote_average}
                />
              </Suspense>
            );
          })}
      </div>
      {noOfPage > 1 && (<CustomPagination setPage={setPage} NoOfPage={noOfPage} />)}
    </div>
  );
};

export default Search;
