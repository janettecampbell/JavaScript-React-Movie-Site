import NavBar from "../layout/NavBar";
import SearchResults from "../layout/SearchResults";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FooterScroll from "../layout/FooterScroll";

const SearchBarResults = (props) => {
  const [movieResults, setMovieResults] = useState([]);
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const location = useLocation();
  const searchInput = location.state.searchInput;

  useEffect(() => {
    // reset search pages upon new search
    setPage(2);

    // use searchInput to provide search results via fetch call
    const fetchSearchData = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchInput}&page=1&include_adult=false`
      ).then((res) => res.json());

      setMovieResults(data.results);
      setTotalPages(data.total_pages);
    };

    fetchSearchData();

    // show load more button only if there are more search results
    if (totalPages < page) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [searchInput, totalPages]);

  const handleClick = () => {
    // increment page count
    setPage(page + 1);

    // pull page count results
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchInput}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((json) => setMovieResults([...movieResults, ...json.results]));

    // show load more button only if there are more search results
    if (totalPages < page + 1) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <div className="search-bar-results">
      <NavBar />
      <SearchResults movieResults={movieResults} />
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

export default SearchBarResults;
