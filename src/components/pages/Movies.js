import NavBar from "../layout/NavBar";
import { useEffect, useState } from "react";
import MovieList from "../layout/MovieList";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((json) => setPopularMovies(json.results));
  }, []);

  return (
    <div className="movie-home">
      <NavBar />
      <div className="column-left">Search Params</div>
      <div className="movie-items">
        {popularMovies && <MovieList popularMovies={popularMovies} />}
      </div>
    </div>
  );
};

export default Movies;
