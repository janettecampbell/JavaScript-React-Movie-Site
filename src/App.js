import "./App.css";
import Home from "./components/pages/Home";
import TVSeries from "./components/pages/TVSeries";
import Movies from "./components/pages/Movies";
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./components/pages/MovieDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-series" element={<TVSeries />} />
        <Route path="/detail/*" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
