import searchIcon from "../images/search-icon.png";
import logo from "../images/movie-logo-white.png";
import { useState } from "react";

const NavBar = (props) => {
  const [searchInput, setSearchInput] = useState(null);
  const [SearchResults, setSearchResults] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchInput(searchTerm);
  };

  const handleClick = (e) => {
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
      .then((json) => setSearchResults(json.results))
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
      <div className="search-bar-group">
        <div className="search-bar">
          <form onSubmit={handleSubmit}>
            <input
              onSubmit={handleSubmit}
              className="search-bar-input"
              type="search"
              onChange={handleChange}
              placeholder="Search..."
            />
            <button className="search-bar-button" onClick={handleSubmit}>
              <img src={searchIcon} alt="magnifying glass" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
