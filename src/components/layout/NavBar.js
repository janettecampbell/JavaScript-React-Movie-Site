import logo from "../images/movie-logo-white.png";
import SearchNavBar from "../layout/SearchNavBar";
import SearchResults from "../layout/SearchResults";
import { useState } from "react";

const NavBar = (props) => {
  const [searchInput, setSearchInput] = useState(null);
  const [movieResults, setMovieResults] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchInput(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&query=${searchInput}&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((json) => setMovieResults(json.results))
      .catch((err) => console.error(console.error(err)));
  };

  return (
    <header>
      <div className="nav-group">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="movie logo" />
          </a>
        </div>
        <nav className="nav">
          <a href="/popular-movies">Popular</a>
          {/* <a href="/tv-series">TV-Series</a> */}
          <a href="/top-rated-movies">Top Rated</a>
          <a href="/upcoming-movies">Upcoming</a>
        </nav>
      </div>
      <div className="notification">
        <p>*Takes 30 seconds for server to wake upon first use.</p>
      </div>

      <div className="search-bar-group">
        <div className="search-bar">
          {!movieResults ? (
            <SearchNavBar
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              searchInput={searchInput}
            />
          ) : (
            <SearchResults movieResults={movieResults} />
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
