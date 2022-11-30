import NavBar from "../layout/NavBar";
import { useEffect, useState } from "react";
import MovieList from "../layout/MovieList";

const Movies = () => {
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [page, setPage] = useState(2);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((json) => setTopRatedMovies(json.results));
  }, []);

  const handleClick = () => {
    setPage(page + 1);

    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((json) => setTopRatedMovies([...topRatedMovies, ...json.results]));
  };

  return (
    <div className="movie-home">
      <NavBar />
      <div className="movie-list">
        {topRatedMovies && <MovieList movies={topRatedMovies} />}
      </div>
      <div className="load-more">
        <button className="btn-load" onClick={handleClick}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default Movies;
