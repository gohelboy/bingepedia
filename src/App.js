import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { lazy, Suspense } from "react";

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
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Container>
          <Suspense fallback={<h1 align="center">Loadning...</h1>}>
            <Routes>
              <Route path="/" element={<Trending />} exact />
              <Route path="/movie" element={<Movie />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
              <Route path="/me" element={<Me />} />
            </Routes>
          </Suspense>
        </Container>
      </div>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
