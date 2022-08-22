import Header from "./components/Header/Header";
import Navbar from "./components/navbar/Navbar";
import Trending from "./Pages/Trending/Trending";
import Movie from "./Pages/Trending/Movie";
import Series from "./Pages/Trending/Series";
import Search from "./Pages/Trending/Search";

import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Container, Switch } from "@mui/material";

function App() {
  return (
    <BrowserRouter className="App">
      <Header />
      <div className="container">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movie" component={Movie} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
