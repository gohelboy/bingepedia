import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { lazy, Suspense, useState } from "react";

/* import Trending from "./Pages/Trending/Trending";
import Movie from "./Pages/Movie/Movie";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";
import Me from "./Pages/Me/Me"; */

import Header from "./components/Header/Header";
import Navbar from "./components/navbar/Navbar";
import "./App.css";

const Trending = lazy(() => import("./Pages/Trending/Trending"));
const Movie = lazy(() => import("./Pages/Movie/Movie"));
const Series = lazy(() => import("./Pages/Series/Series"));
const Search = lazy(() => import("./Pages/Search/Search"));
const Me = lazy(() => import("./Pages/Me/Me"));

function App() {
  const [openUserMenu, setOpenUserMenu] = useState('me');
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Container>
          <Suspense fallback={<div className="loader"></div>}>
            <Routes>
              <Route path="/" element={<Trending />} />
              <Route path="/movie" element={<Movie />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
              <Route path="/me" element={<Me setOpenUserMenu={setOpenUserMenu} openUserMenu={openUserMenu} />} />
            </Routes>
          </Suspense>
        </Container>
      </div>
      <Navbar setOpenUserMenu={setOpenUserMenu} />
    </BrowserRouter>
  );
}

export default App;
