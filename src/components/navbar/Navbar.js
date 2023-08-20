import { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SearchIcon from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authSlice"

export default function SimpleBottomNavigation({ setOpenUserMenu }) {
  const user = useSelector(selectUser)
  const navigate = useNavigate();
  const initialPathname = window.location.pathname;
  const [value, setValue] = useState(() => {
    if (initialPathname === '/') return 0;
    if (initialPathname === '/movie') return 1;
    if (initialPathname === '/series') return 2;
    if (initialPathname === '/search') return 3;
    if (initialPathname === '/me') return 4;
    return 0;
  });

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (newValue === 0) navigate("/");
        else if (newValue === 1) navigate("/movie");
        else if (newValue === 2) navigate("/series");
        else if (newValue === 3) navigate("/search");
        else if (newValue === 4) navigate("/me");
      }}
      style={{
        width: "100%",
        height: "10vh",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#061826",
        boxShadow: "0px -1px 10px rgba(0, 0, 0, 0.3)",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <BottomNavigationAction
        showLabel={value === 0}
        style={{ color: "white" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        showLabel={value === 1}
        style={{ color: "white" }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        showLabel={value === 2}
        style={{ color: "white" }}
        label="Series"
        icon={<LiveTvIcon />}
      />
      <BottomNavigationAction
        showLabel={value === 3}
        style={{ color: "white" }}
        label="Search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        showLabel={value === 4}
        style={{ color: "white" }}
        label={user ? user.username : "Me"}
        icon={<Person />}
        onClick={() => setOpenUserMenu('me')}
      />
    </BottomNavigation>
  );
}
