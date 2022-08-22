import Header from "./components/Header/Header";
import Navbar from "./components/navbar/Navbar";
import Trending from "./Pages/Trending/Trending";
import Movie from "./Pages/Movie/Movie";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} exact />
            <Route path="/movie" element={<Movie />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
