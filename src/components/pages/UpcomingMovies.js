import NavBar from "../layout/NavBar";
import { useEffect, useState } from "react";
import MovieList from "../layout/MovieList";

const Movies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [page, setPage] = useState(2);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((json) => setUpcomingMovies(json.results));
  }, []);

  const handleClick = () => {
    setPage(page + 1);

    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((json) => setUpcomingMovies([...upcomingMovies, ...json.results]));
  };

  return (
    <div className="movie-home">
      <NavBar />
      <div className="movie-list">
        {upcomingMovies && <MovieList movies={upcomingMovies} />}
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
