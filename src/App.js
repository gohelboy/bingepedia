import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import Header from "./components/Header/Header";
import Navbar from "./components/navbar/Navbar";

import { GlobalProvider } from "./context/Globalstate";

import Trending from "./Pages/Trending/Trending";
import Movie from "./Pages/Movie/Movie";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";
import Me from "./Pages/Me/Me";

import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Container>
            <Routes>
              <Route path="/" element={<Trending />} exact />
              <Route path="/movie" element={<Movie />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
              <Route path="/me" element={<Me />} />
            </Routes>
          </Container>
        </div>
        <Navbar />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
