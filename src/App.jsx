import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { lazy, Suspense, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import SnackbarToast from "./components/Snackbar/SnackbarToast";
import { useDispatch, useSelector } from "react-redux";
import { selectSaveSliceMessage, selectSaveSliceStatus, initializeUserLists } from "./redux/features/saveSlice";
import { selectUser } from "./redux/features/authSlice";

const Trending = lazy(() => import("./Pages/Trending/Trending"));
const Movie = lazy(() => import("./Pages/Movie/Movie"));
const Series = lazy(() => import("./Pages/Series/Series"));
const Search = lazy(() => import("./Pages/Search/Search"));
const Me = lazy(() => import("./Pages/Me/Me"));

function App() {
  const [openUserMenu, setOpenUserMenu] = useState("me");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const saveStatus = useSelector(selectSaveSliceStatus);
  const saveMessage = useSelector(selectSaveSliceMessage);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (saveStatus != null) {
      setOpen(true);
    }
  }, [saveMessage, saveStatus]);

  useEffect(() => {
    if (user) {
      dispatch(initializeUserLists());
    }
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <SnackbarToast
        open={open}
        setopen={setOpen}
        message={saveMessage}
        severity={!saveStatus && "error"}
      />
      <Header />
      <div className="container">
        <Container>
          <Suspense fallback={<div className="loader"></div>}>
            <Routes>
              <Route path="/" element={<Trending />} />
              <Route path="/movie" element={<Movie />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/me"
                element={
                  <Me
                    setOpenUserMenu={setOpenUserMenu}
                    openUserMenu={openUserMenu}
                  />
                }
              />
            </Routes>
          </Suspense>
        </Container>
      </div>
      <Navbar setOpenUserMenu={setOpenUserMenu} />
    </BrowserRouter>
  );
}

export default App;

