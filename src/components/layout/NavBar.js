import searchIcon from "../images/search-icon.png";
import logo from "../images/movie-logo-white.png";

const NavBar = (props) => {
  return (
    <header>
      <div className="nav-group">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="movie logo" />
          </a>
        </div>
        <nav className="nav">
          <a href="/movies">Movies</a>
          <a href="tv-series">TV-Series</a>
        </nav>
      </div>
      <div className="search-bar-group">
        <div className="search-bar">
          <img src={searchIcon} alt="magnifying glass" />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
