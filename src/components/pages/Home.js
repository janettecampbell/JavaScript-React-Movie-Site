import SearchBarHome from "../layout/SearchBarHome";
import NavBar from "../layout/NavBar";
import Backdrop from "../Backdrop";
import { useEffect, useState } from "react";
import SearchResults from "../layout/SearchResults";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [movieResults, setMovieResults] = useState("");
  const [searchInput, setSearchInput] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error(console.error(err)));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchInput(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&query=${searchInput}&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((json) => setMovieResults(json.results))
      .catch((err) => console.error(console.error(err)));
  };

  for (let i = 0; i < movieResults.length; i++) {
    if (movieResults[i].poster_path === undefined) {
      movieResults.splice(i, 1);
    } else {
      continue;
    }
  }

  return (
    <div className="home-page">
      {movies && <Backdrop movies={movies} />}
      <NavBar />
      {/* Render Search Bar First, Render Results After Submit*/}
      {!movieResults ? (
        <SearchBarHome
          movieResults={movieResults}
          setMovieResults={setMovieResults}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchInput={searchInput}
        />
      ) : (
        <SearchResults movieResults={movieResults} />
      )}
    </div>
  );
};

export default Home;
