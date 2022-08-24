import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

const GenreChip = ({
  type,
  selctedGernre,
  setSelectedGenre,
  genre,
  setGenre,
  setPage,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setGenre(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenre({});
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {genre.map((genre) => {
        <Chip label={genre.name} />;
      })}
    </div>
  );
};

export default GenreChip;
