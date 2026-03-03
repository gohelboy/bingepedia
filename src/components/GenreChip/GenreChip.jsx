import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const GenreChip = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
    );

    setGenres(data.genres);
  };

  const handleAddGenre = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemoveGenre = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const safeSelected = Array.isArray(selectedGenres) ? selectedGenres : [];
  const safeGenres = Array.isArray(genres) ? genres : [];

  return (
    <div style={{ margin: "14px 0px" }}>
      {safeSelected.map((ge) => (
          <Chip
            size="small"
            label={ge.name}
            clickable
            color="primary"
            key={ge.id}
            style={{ margin: 2 }}
            onDelete={() => handleRemoveGenre(ge)}
          />
        ))}
      {safeGenres.map((g) => (
          <Chip
            size="small"
            label={g.name}
            clickable
            color="success"
            variant="outlined"
            key={g.id}
            style={{ margin: 2 }}
            onClick={() => handleAddGenre(g)}
          />
        ))}
    </div>
  );
};

export default GenreChip;

