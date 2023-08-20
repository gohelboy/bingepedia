import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { lazy, Suspense, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import SnackbarToast from "./components/Snackbar/SnackbarToast";
import { useSelector } from "react-redux";
import { selectSaveSliceMessage, selectSaveSliceStatus } from "./redux/features/saveSlice";

const Trending = lazy(() => import("./Pages/Trending/Trending"));
const Movie = lazy(() => import("./Pages/Movie/Movie"));
const Series = lazy(() => import("./Pages/Series/Series"));
const Search = lazy(() => import("./Pages/Search/Search"));
const Me = lazy(() => import("./Pages/Me/Me"));

function App() {
  const [openUserMenu, setOpenUserMenu] = useState('me');
  const [open, setOpen] = useState(false);
  const saveStatus = useSelector(selectSaveSliceStatus);
  const saveMessage = useSelector(selectSaveSliceMessage);
  useEffect(() => { saveStatus && setOpen(true) }, [saveMessage, saveStatus]);
  return (
    <BrowserRouter>
      <SnackbarToast open={open} setopen={setOpen} message={saveMessage} severity={!saveStatus && 'error'} />
      <Header />
      <div className="container">
        <Container>
          <Suspense fallback={<div className="loader"></div>}>
            <Routes>
              <Route exect path="/" element={<Trending />} />
              <Route exect path="/movie" element={<Movie />} />
              <Route exect path="/series" element={<Series />} />
              <Route exect path="/search" element={<Search />} />
              <Route exect path="/me" element={<Me setOpenUserMenu={setOpenUserMenu} openUserMenu={openUserMenu} />} />
            </Routes>
          </Suspense>
        </Container>
      </div>
      <Navbar setOpenUserMenu={setOpenUserMenu} />
    </BrowserRouter>
  );
}

export default App;
