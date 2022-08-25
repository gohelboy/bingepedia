import { SearchRounded } from "@mui/icons-material";
import { Button } from "@mui/material";

const Search = () => {
  return (
    <div>
      <h1 className="pageTitle">Search</h1>
      <div>
        <input type={"text"} name={"search"} placeholder={"Enter Date"} />
        <Button variant="contained" style={{ backgroundColor: "red" }}>
          <SearchRounded />
        </Button>
      </div>
    </div>
  );
};

export default Search;
