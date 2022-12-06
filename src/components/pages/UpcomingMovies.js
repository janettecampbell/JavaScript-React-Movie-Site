import NavBar from "../layout/NavBar";
import { useEffect, useState } from "react";
import MovieList from "../layout/MovieList";
import FooterScroll from "../layout/FooterScroll";

const Movies = () => {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(2);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // fetch movie data
    const fetchUpcomingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
      ).then((res) => res.json());

      setUpcomingMovies(data.results);
      setTotalPages(data.total_pages);
    };

    fetchUpcomingMovies();

    // set load more to not visible if there are no more search results
    if (totalPages < page) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [totalPages]);

  const handleClick = () => {
    // increment page for use in fetch
    setPage(page + 1);

    // fetch page of results and render with current results
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((json) => setUpcomingMovies([...upcomingMovies, ...json.results]));

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
        {upcomingMovies && <MovieList movies={upcomingMovies} />}
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
