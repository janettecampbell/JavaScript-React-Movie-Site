import SearchBarHome from "../layout/SearchBarHome";
import NavBar from "../layout/NavBar";
import Backdrop from "../layout/Backdrop";
import Footer from "../layout/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [searchInput, setSearchInput] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // get popular movies to use as background
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error(err));
  }, []);

  // get search Input
  const handleChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchInput(searchTerm);
  };

  // render search results to search results page
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
      <SearchBarHome
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchInput={searchInput}
      />
      <Footer />
    </div>
  );
};

export default Home;
