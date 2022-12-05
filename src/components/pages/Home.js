import SearchBarHome from "../layout/SearchBarHome";
import NavBar from "../layout/NavBar";
import Backdrop from "../layout/Backdrop";
import { useEffect, useState } from "react";
import SearchResults from "../layout/SearchResults";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [movieResults, setMovieResults] = useState("");
  const [searchInput, setSearchInput] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchInput(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const basePath = location.pathname;
    const newPath = `${basePath}/${searchInput || "search"}`;

    if (newPath !== location.pathname) {
      navigate(`/search-results/${searchInput}`, {
        state: { searchInput: searchInput },
      });
    }
  };

  return (
    <div className="home-page">
      {movies && <Backdrop movies={movies} />}
      <NavBar />
      {/* Render Search Bar First, Render Results After Submit*/}
      <SearchBarHome
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchInput={searchInput}
      />
    </div>
  );
};

export default Home;
