import NavBar from "../layout/NavBar";
import { useEffect, useState } from "react";
import MovieList from "../layout/MovieList";
import FooterScroll from "../layout/FooterScroll";

const Movies = () => {
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(2);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // reset search pages upon new search
    setPage(2);

    // fetch top rated movies data
    const fetchTopRatedData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
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
  }, [totalPages]);

  const handleClick = () => {
    // increment page count
    setPage(page + 1);

    // get top rated movie for page and show with existing results
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
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
      <FooterScroll />
    </div>
  );
};

export default Movies;
