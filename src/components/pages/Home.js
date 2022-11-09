import SearchBar from "../layout/SearchBarHome";
import NavBar from "../layout/NavBar";
import Backdrop from "../Backdrop";
import { useEffect, useState } from "react";

const Home = (props) => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((json) => setMovies(json.results));
  }, []);
  return (
    <div className="home-page">
      {movies && <Backdrop movies={movies} />}
      <NavBar />
      <SearchBar />
    </div>
  );
};

export default Home;
