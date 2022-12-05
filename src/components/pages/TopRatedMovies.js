import NavBar from "../layout/NavBar";
import { useEffect, useState } from "react";
import MovieList from "../layout/MovieList";

const Movies = () => {
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(2);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // reset search pages upon new search
    setPage(2);

    const fetchTopRatedData = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
      ).then((res) => res.json());

      setTopRatedMovies(data.results);
      setTotalPages(data.total_pages);
    };

    fetchTopRatedData();

    // show load more button only if there are more search results
    if (totalPages < page) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    // fetch(
    //   "https://api.themoviedb.org/3/movie/top_rated?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=1"
    // )
    // .then((res) => res.json())
    // .then((json) => setTopRatedMovies(json.results));
  }, [totalPages]);

  const handleClick = () => {
    setPage(page + 1);

    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=4af29920e903cef08f533ae3feff4860&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((json) => setTopRatedMovies([...topRatedMovies, ...json.results]));

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
        {topRatedMovies && <MovieList movies={topRatedMovies} />}
      </div>
      <div className="load-more">
        <button
          className={`btn-load${isVisible ? " btn-visible" : ""}`}
          onClick={handleClick}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Movies;
