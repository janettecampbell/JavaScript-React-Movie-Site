import NavBar from "../layout/NavBar";
import { useEffect, useState } from "react";
import MovieList from "../layout/MovieList";
import FooterScroll from "../layout/FooterScroll";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(2);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // fetch Movie data
    const fetchMovieData = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
      ).then((res) => res.json());

      setPopularMovies(data.results);
      setTotalPages(data.total_pages);
    };

    fetchMovieData();

    // show load more button only if there are more search results
    if (totalPages < page) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [totalPages]);

  const handleClick = () => {
    // increment page count
    setPage(page + 1);

    // get popular movie data for page from api and render with
    // current results
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((json) => setPopularMovies([...popularMovies, ...json.results]));

    // show load more button only if there are more search results
    if (totalPages < page + 1) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <div className="movie-home">
      <NavBar />
      <div className="movie-list">
        {popularMovies && <MovieList movies={popularMovies} />}
      </div>
      <div className="load-more">
        <button
          className={`btn-load${isVisible ? " btn-visible" : ""}`}
          onClick={handleClick}
        >
          Load More
        </button>
      </div>
      <FooterScroll />
    </div>
  );
};

export default Movies;
