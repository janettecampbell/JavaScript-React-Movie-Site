import "./App.css";
import Home from "./components/pages/Home";
import TVSeries from "./components/pages/TVSeries";
import PopularMovies from "./components/pages/PopularMovies";
import TopRatedMovies from "./components/pages/TopRatedMovies";
import UpcomingMovies from "./components/pages/UpcomingMovies";
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./components/pages/MovieDetail";
import SeriesDetail from "./components/pages/SeriesDetail";
import SearchResults from "./components/layout/SearchResults";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/popular-movies" element={<PopularMovies />} />
        <Route path="/top-rated-movies" element={<TopRatedMovies />} />
        <Route path="/upcoming-movies" element={<UpcomingMovies />} />
        <Route path="/tv-series" element={<TVSeries />} />
        <Route path="/movie-detail/*" element={<MovieDetail />} />
        <Route path="/series-detail/*" element={<SeriesDetail />} />
        <Route path="/search-results/*" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;
