import { useState, useEffect } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core";

import { useNavigate } from "react-router-dom";

import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SearchIcon from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";

const useStyle = makeStyles({
  root: {
    width: "100%",
    height: "8vh",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#082032",
    boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.3)",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyle();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/Movie");
    else if (value === 2) navigate("/Series");
    else if (value === 3) navigate("/Search");
    else if (value === 4) navigate("/Me");
  }, [value, navigate]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Series"
        icon={<LiveTvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Me"
        icon={<Person />}
      />
    </BottomNavigation>
  );
}
